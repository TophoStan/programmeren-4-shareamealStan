const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../index");
let database = [];

chai.should();
chai.use(chaiHttp);

describe("UC-naam", () => {
  describe("Testcase naam van use case naam", () => {
    beforeEach((done) => {
      database = [];
      done();
    });

    it("When a required input is missing, a valid error should be returned", (done) => {
      chai
        .request(server)
        .post("/api/user")
        .send({
          // firtName ontbreekt
          lastName: "Tophoven",
          emailAdress: "mail",
        })
        .end((err, res) => {
          res.should.be.an("object");
          let { status, result } = res.body;
          status.should.equals(400);
          result.should.be
            .a("string")
            .that.equals("firstName must be a string");

          done();
        });
    });
  });
});
