describe("Post calls", () => {

    it("Create Tourist using hardcoded values", () => {
        const requestBody = {
            tourist_name: "john",
            tourist_email: "johnny3434@test.com",
            tourist_location: "Paris"
        }
        cy.request({
            method: 'POST',
            url: 'http://restapi.adequateshop.com/api/Tourist',
            body: requestBody
        })
            .then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body.tourist_name).to.eq("john")
                expect(response.body.tourist_email).to.eq("johnny3434@test.com")
                expect(response.body.tourist_location).to.eq("Paris")
                cy.log(response.body.id)
            }
            )
    })

    it("Create Tourist using dynamic values", () => {
        const requestBody = {
            tourist_name: Math.random().toString(5).substring(2),
            tourist_email: Math.random().toString(5).substring(2) + "@test.com",
            tourist_location: "Paris",
        }
        cy.request({
            method: 'POST',
            url: 'http://restapi.adequateshop.com/api/Tourist',
            body: requestBody
        })
            .then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body.tourist_name).to.eq(requestBody.tourist_name)
                expect(response.body.tourist_email).to.eq(requestBody.tourist_email)
                expect(response.body.tourist_location).to.eq(requestBody.tourist_location)
            }
            )
    })

    it.only("Create Tourist using fixture file", () => {
        cy.fixture("Tourist").then((data) => {
            cy.request({
                method: 'POST',
                url: 'http://restapi.adequateshop.com/api/Tourist',
                body: data
            })
                .then((response) => {
                    expect(response.status).to.eq(201)
                    expect(response.body.tourist_name).to.eq(data.tourist_name)
                    expect(response.body.tourist_email).to.eq(data.tourist_email)
                    expect(response.body.tourist_location).to.eq(data.tourist_location)
                    expect(response.body).has.property('tourist_email',data.tourist_email)
                    expect(response.body).to.have.property('tourist_email',data.tourist_email)
                }
                )
        })
    })

})