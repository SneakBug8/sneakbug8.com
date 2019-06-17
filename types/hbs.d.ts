declare module "hbs" {
    export = hbs;
    const hbs: {
        SafeString: Function;
        Utils: {
            appendContextPath: Function;
            blockParams: Function;
            createFrame: Function;
            escapeExpression: Function;
            extend: Function;
            indexOf: Function;
            isArray: Function;
            isEmpty: Function;
            isFunction: Function;
        };
        cache: {};
        compile: Function;
        create: Function;
        handlebars: {
            AST: {
                helpers: {
                    helperExpression: Function;
                    scopedId: Function;
                    simpleId: Function;
                };
            };
            COMPILER_REVISION: number;
            Compiler: Function;
            Exception: Function;
            HandlebarsEnvironment: Function;
            JavaScriptCompiler: Function;
            Parser: {
                Parser: Function;
                defaultActions: {
                    "102": any[];
                    "105": any[];
                    "111": any[];
                    "112": any[];
                    "117": any[];
                    "120": any[];
                    "123": any[];
                    "124": any[];
                    "136": any[];
                    "137": any[];
                    "4": any[];
                    "55": any[];
                    "57": any[];
                    "61": any[];
                    "74": any[];
                    "83": any[];
                    "87": any[];
                    "91": any[];
                };
                lexer: {
                    EOF: number;
                    begin: Function;
                    conditions: {
                        INITIAL: any;
                        com: any;
                        emu: any;
                        mu: any;
                        raw: any;
                    };
                    input: Function;
                    less: Function;
                    lex: Function;
                    more: Function;
                    next: Function;
                    options: {};
                    parseError: Function;
                    pastInput: Function;
                    performAction: Function;
                    popState: Function;
                    pushState: Function;
                    rules: any[];
                    setInput: Function;
                    showPosition: Function;
                    topState: Function;
                    unput: Function;
                    upcomingInput: Function;
                };
                parse: Function;
                parseError: Function;
                performAction: Function;
                productions_: number[];
                symbols_: {
                    $accept: number;
                    $end: number;
                    BOOLEAN: number;
                    CLOSE: number;
                    CLOSE_BLOCK_PARAMS: number;
                    CLOSE_RAW_BLOCK: number;
                    CLOSE_SEXPR: number;
                    CLOSE_UNESCAPED: number;
                    COMMENT: number;
                    CONTENT: number;
                    DATA: number;
                    END_RAW_BLOCK: number;
                    EOF: number;
                    EQUALS: number;
                    ID: number;
                    INVERSE: number;
                    NULL: number;
                    NUMBER: number;
                    OPEN: number;
                    OPEN_BLOCK: number;
                    OPEN_BLOCK_PARAMS: number;
                    OPEN_ENDBLOCK: number;
                    OPEN_INVERSE: number;
                    OPEN_INVERSE_CHAIN: number;
                    OPEN_PARTIAL: number;
                    OPEN_PARTIAL_BLOCK: number;
                    OPEN_RAW_BLOCK: number;
                    OPEN_SEXPR: number;
                    OPEN_UNESCAPED: number;
                    SEP: number;
                    STRING: number;
                    UNDEFINED: number;
                    block: number;
                    blockParams: number;
                    blockParams_repetition_plus0: number;
                    block_option0: number;
                    block_option1: number;
                    closeBlock: number;
                    content: number;
                    dataName: number;
                    error: number;
                    hash: number;
                    hashSegment: number;
                    hash_repetition_plus0: number;
                    helperName: number;
                    inverseAndProgram: number;
                    inverseChain: number;
                    inverseChain_option0: number;
                    mustache: number;
                    mustache_option0: number;
                    mustache_option1: number;
                    mustache_repetition0: number;
                    mustache_repetition1: number;
                    openBlock: number;
                    openBlock_option0: number;
                    openBlock_option1: number;
                    openBlock_repetition0: number;
                    openInverse: number;
                    openInverseChain: number;
                    openInverseChain_option0: number;
                    openInverseChain_option1: number;
                    openInverseChain_repetition0: number;
                    openInverse_option0: number;
                    openInverse_option1: number;
                    openInverse_repetition0: number;
                    openPartialBlock: number;
                    openPartialBlock_option0: number;
                    openPartialBlock_repetition0: number;
                    openRawBlock: number;
                    openRawBlock_option0: number;
                    openRawBlock_repetition0: number;
                    param: number;
                    partial: number;
                    partialBlock: number;
                    partialName: number;
                    partial_option0: number;
                    partial_repetition0: number;
                    path: number;
                    pathSegments: number;
                    program: number;
                    program_repetition0: number;
                    rawBlock: number;
                    rawBlock_repetition_plus0: number;
                    root: number;
                    sexpr: number;
                    sexpr_option0: number;
                    sexpr_repetition0: number;
                    statement: number;
                };
                table: {
                    "14": any;
                    "15": any;
                    "19": any;
                    "29": any;
                    "3": any;
                    "34": any;
                    "4": any;
                    "48": any;
                    "5": any;
                    "51": any;
                    "55": any;
                    "6": any;
                    "60": any;
                }[];
                terminals_: {
                    "14": string;
                    "15": string;
                    "18": string;
                    "19": string;
                    "2": string;
                    "23": string;
                    "29": string;
                    "33": string;
                    "34": string;
                    "39": string;
                    "44": string;
                    "47": string;
                    "48": string;
                    "5": string;
                    "51": string;
                    "54": string;
                    "55": string;
                    "60": string;
                    "65": string;
                    "68": string;
                    "72": string;
                    "73": string;
                    "75": string;
                    "77": string;
                    "80": string;
                    "81": string;
                    "82": string;
                    "83": string;
                    "84": string;
                    "85": string;
                    "87": string;
                };
                trace: Function;
                yy: {};
            };
            REVISION_CHANGES: {
                "1": string;
                "2": string;
                "3": string;
                "4": string;
                "5": string;
                "6": string;
                "7": string;
            };
            SafeString: Function;
            Utils: {
                appendContextPath: Function;
                blockParams: Function;
                createFrame: Function;
                escapeExpression: Function;
                extend: Function;
                indexOf: Function;
                isArray: Function;
                isEmpty: Function;
                isFunction: Function;
            };
            VERSION: string;
            VM: {
                checkRevision: Function;
                invokePartial: Function;
                noop: Function;
                resolvePartial: Function;
                template: Function;
                wrapProgram: Function;
            };
            compile: Function;
            createFrame: Function;
            decorators: {
                inline: Function;
            };
            escapeExpression: Function;
            helpers: {
                blockHelperMissing: Function;
                each: Function;
                helperMissing: Function;
                if: Function;
                log: Function;
                lookup: Function;
                unless: Function;
                with: Function;
            };
            log: Function;
            logger: {
                level: string;
                log: Function;
                lookupLevel: Function;
                methodMap: string[];
            };
            parse: Function;
            partials: {};
            precompile: Function;
            registerDecorator: Function;
            registerHelper: Function;
            registerPartial: Function;
            template: Function;
            unregisterDecorator: Function;
            unregisterHelper: Function;
            unregisterPartial: Function;
        };
        localsAsTemplateData: Function;
        registerAsyncHelper: Function;
        registerHelper: Function;
        registerPartial: Function;
        registerPartials: Function;
    };
}