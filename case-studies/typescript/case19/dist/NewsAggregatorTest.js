"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typedi_1 = require("typedi");
// Mock for test
class MockSource {
    async fetchArticles() {
        console.log("🧪 MOCK: Injecting test data");
        return ["MOCK ✅ Challenge 3 PASSED!"];
    }
}
// Test aggregator (same pattern)
let MockAggregator = class MockAggregator {
    constructor(source) {
        this.source = source;
    }
    async getArticles() {
        return await this.source.fetchArticles();
    }
};
MockAggregator = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(() => MockSource)),
    __metadata("design:paramtypes", [Object])
], MockAggregator);
// FIXED: Use static Container + reset for clean test
async function runMockTest() {
    typedi_1.Container.reset(); // Clear previous registrations
    // Register mock with RSSFeedSource token (same swap pattern)
    typedi_1.Container.set(MockSource, new MockSource());
    const agg = typedi_1.Container.get(MockAggregator);
    const articles = await agg.getArticles();
    console.log("Test Articles:", articles);
}
runMockTest();
