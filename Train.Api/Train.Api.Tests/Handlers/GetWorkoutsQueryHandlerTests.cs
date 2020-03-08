using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Azure.Cosmos;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Train.Api.QueryHandlers;
using Train.Api.Results;

namespace Train.Api.Tests.Handlers
{
  [TestClass]
  public class GetWorkoutsQueryHandlerTests
  {
    [TestMethod]
    public void GetWorkoutsQueryHandler_ThrowsNullException()
    {
      var mockContainer = new Mock<Container>();

      mockContainer.Setup(m => m.GetItemQueryIterator<GetWorkoutsResult>(It.IsAny<string>())))
        .Returns(new FeedIterator<GetWorkoutsResult>());

      var handler = new GetWorkoutsQueryHandler(mockContainer.Object);
    }
  }
}
