import "reflect-metadata";
import { Container, Service, Inject } from "typedi";
import { NewsSource } from "./NewsSource";

// Mock for test
class MockSource implements NewsSource {
  async fetchArticles(): Promise<string[]> {
    console.log("🧪 MOCK: Injecting test data");
    return ["MOCK ✅ Challenge 3 PASSED!"];
  }
}

// Test aggregator (same pattern)
@Service()
class MockAggregator {
  constructor(@Inject(() => MockSource) private source: NewsSource) {}

  async getArticles(): Promise<string[]> {
    return await this.source.fetchArticles();
  }
}

// FIXED: Use static Container + reset for clean test
async function runMockTest() {
  Container.reset();  // Clear previous registrations
  
  // Register mock with RSSFeedSource token (same swap pattern)
  Container.set(MockSource, new MockSource());

  const agg = Container.get(MockAggregator);
  const articles = await agg.getArticles();
  
  console.log("Test Articles:", articles);
}

runMockTest();
