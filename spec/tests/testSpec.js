describe("migration script", () => {
  var script = require('../..');
  var path = require('path');

  it("normalizes text", () => {
    var sourceFile = path.join(__dirname, '../fixtures/messages-example'),
        expectedResult = path.join(__dirname, '../fixtures/messages-example-expected');

    var res = script.getJSONByContent(
      script.getFileContent(sourceFile)
    );

    expect(
      script.normalize(
        script.getFileContent(sourceFile)
      )
    ).toEqual(
      script.normalize(
        script.getFileContent(expectedResult)
      )
    );
  });

  it("reads messages files", () => {
    var sourceFile = path.join(__dirname, '../fixtures/messages-example');
    var res = script.getContent(sourceFile);

    expect(
      JSON.stringify(res, null, 2)
    ).toEqual(
      JSON.stringify({
        "agencyselection.text.autocomplete": "Type your location (city, zip code)",
        "agencyselection.title": "Contact Us",
        "agencyselection.titleWithVariables": "Contact Us %@1 %@2 %@3 %@4 %@5 %@6 %@7 %@8 %@9 %@10 %@11",
        "agencyselection.titleWithOtherVariables": "%@3 Contact %@4 Us %@1 %@2",
        "booking.introDirectPayment.text.nextsteps.signerUser": "<ol class=\"font-bold\"> <li>Entering your contact details and the details of all travelers</li> " +
          "</ol> <p> Once you''ve gone.</p>"
      }, null, 2)
    );
  });
});