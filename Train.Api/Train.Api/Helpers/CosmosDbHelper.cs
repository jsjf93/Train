using System;
using Microsoft.Azure.Cosmos;

namespace Train.Api.Helpers
{
  public static class CosmosDbHelper
  {
    public static CosmosClient Client { get; private set; }

    static CosmosDbHelper()
    {
      var endpoint = Environment.GetEnvironmentVariable("CosmosEndpoint");
      var masterKey = Environment.GetEnvironmentVariable("CosmosMasterKey");

      Client = new CosmosClient(endpoint, masterKey);
    }
  }
}
