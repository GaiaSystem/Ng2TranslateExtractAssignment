import { Extractor } from '../utils/extractor';
import { TranslationCollection } from '../utils/translation.collection';
import { ParserInterface } from '../parsers/parser.interface';
import { PipeParser } from '../parsers/pipe.parser';
import { DirectiveParser } from '../parsers/directive.parser';
import { ServiceParser } from '../parsers/service.parser';
import { JsonCompiler } from '../compilers/json.compiler';
import { PoCompiler } from '../compilers/po.compiler';

import * as fs from 'fs';
import * as path from 'path';
import * as cli from 'cli';

const options = cli.parse({
	dir: ['d', 'Path you would like to extract strings from', 'dir', process.env.PWD],
	output: ['o', 'Path you would like to save extracted strings to', 'dir', process.env.PWD],
	format: ['f', 'Output format', ['json', 'pot'], 'json'],
	replace: ['r', 'Replace the contents of output file if it exists (Merges by default)', 'boolean', false],
	clean: ['c', 'Remove obsolete strings when merging', 'boolean', false]
});

const normalizedDir: string = path.resolve(options.dir);
const normalizedOutput: string = path.resolve(options.output);

let outputDir: string = normalizedOutput;
let outputFilename: string = `template.${options.format}`;
if (!fs.existsSync(normalizedOutput) || !fs.statSync(normalizedOutput).isDirectory()) {
	outputDir = path.dirname(normalizedOutput);
	outputFilename = path.basename(normalizedOutput);
}
const outputPath: string = path.join(outputDir, outputFilename);

[normalizedDir, outputDir].forEach(dir => {
	if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
		cli.fatal(`The path you supplied was not found: '${dir}'`);
	}
});

let compiler = new JsonCompiler();
if (options.format === 'pot') {
	compiler = new PoCompiler();
}
const parsers: ParserInterface[] = [
	new PipeParser(),
	new DirectiveParser(),
	new ServiceParser()
];
const patterns: string[] = [
	'/**/*.html',
	'/**/*.ts',
	'/**/*.js'
];

try {
	const extractor: Extractor = new Extractor(parsers, patterns);
	cli.info(`Extracting strings from '${normalizedDir}'`);

	const extracted: TranslationCollection = extractor.process(normalizedDir);
	cli.ok(`* Extracted ${extracted.count()} strings`);

	let collection: TranslationCollection = extracted;

	if (!options.replace && fs.existsSync(outputPath)) {
		const existing: TranslationCollection = compiler.parse(fs.readFileSync(outputPath, 'utf-8'));
		if (existing.count() > 0) {
			collection = extracted.union(existing);
			cli.ok(`* Merged with ${existing.count()} existing strings`);
		}

		if (options.clean) {
			const collectionCount = collection.count();
			collection = collection.intersect(extracted);
			const removeCount = collectionCount - collection.count();
			if (removeCount > 0) {
				cli.ok(`* Removed ${removeCount} obsolete strings`);
			}
		}
	}

	fs.writeFileSync(outputPath, compiler.compile(collection));
	cli.ok(`* Saved to '${outputPath}'`);
} catch (e) {
	cli.fatal(e.toString());
}
