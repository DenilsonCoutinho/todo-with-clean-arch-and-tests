// infrastructure/http/http-client.ts

export interface HttpClient {
  findMany(url: string): Promise<any>;
}
