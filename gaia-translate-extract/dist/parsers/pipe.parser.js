"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_template_parser_1 = require('./abstract-template.parser');
var translation_collection_1 = require('../utils/translation.collection');
var PipeParser = (function (_super) {
    __extends(PipeParser, _super);
    function PipeParser() {
        _super.apply(this, arguments);
    }
    PipeParser.prototype.extract = function (contents, path) {
        if (path && this._isAngularComponent(path)) {
            contents = this._extractInlineTemplate(contents);
        }
        return this._parseTemplate(contents);
    };
    PipeParser.prototype._parseTemplate = function (template) {
        var collection = new translation_collection_1.TranslationCollection();
        var regExp = /(['"`])([^\1\r\n]*?)\1\s*\|\s*translate/g;
        var matches;
        while (matches = regExp.exec(template)) {
            collection = collection.add(matches[2]);
        }
        return collection;
    };
    return PipeParser;
}(abstract_template_parser_1.AbstractTemplateParser));
exports.PipeParser = PipeParser;
//# sourceMappingURL=pipe.parser.js.map