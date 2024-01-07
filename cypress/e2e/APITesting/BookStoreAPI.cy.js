describe("book store api", () => {

    it("test book api e2e flow", () => {
        cy.fixture("bookstorecredentials").then((payload) => {
            cy.request({
                method: 'POST',
                url: 'https://demoqa.com/Account/v1/User',
                body: payload
            })
                .then((response) => {
                    expect(response.status).equal(201)
                    cy.log(JSON.stringify(response.body))
                    const userId = response.body.userID

                    cy.request({
                        method: 'POST',
                        url: 'https://demoqa.com/Account/v1/GenerateToken',
                        body: payload
                    })
                        .then((response) => {
                            expect(response.status).equal(200)
                            cy.log(JSON.stringify(response.body))
                            const accessToken = response.body.token
                            cy.log(accessToken)

                            cy.request({
                                method: 'GET',
                                url: 'https://demoqa.com/BookStore/v1/Books',

                            })
                                .then((response) => {
                                    expect(response.status).equal(200)
                                    cy.log(JSON.stringify(response.body))
                                    const isbn1 = response.body.books[0].isbn
                                    cy.log(isbn1)
                                    const isbn2 = response.body.books[1].isbn
                                    cy.log(isbn2)

                                    cy.request({
                                        method: 'POST',
                                        url: 'https://demoqa.com/BookStore/v1/Books',
                                        Authorization: 'bearer ' + accessToken,
                                        auth: {
                                            username: payload.userName,
                                            password: payload.password,
                                        },
                                        body:
                                        {
                                            userId: userId,
                                            collectionOfIsbns: [
                                                {
                                                    isbn: isbn1
                                                },
                                                {
                                                    isbn: isbn2
                                                }
                                            ]
                                        }
                                    })
                                        .then((response) => {
                                            expect(response.status).equal(201)
                                            cy.log(JSON.stringify(response.body))
                                            expect(response.body.books[0].isbn).equal(isbn1)
                                            expect(response.body.books[1].isbn).equal(isbn2)

                                            cy.request({
                                                method: 'DELETE',
                                                url: 'https://demoqa.com/BookStore/v1/Book',
                                                Authorization: 'bearer ' + accessToken,
                                                auth: {
                                                    username: payload.userName,
                                                    password: payload.password,
                                                },
                                                body: {
                                                    isbn: isbn1,
                                                    userId: userId,
                                                }

                                            })
                                                .then((response) => {
                                                    expect(response.status).equal(204)
                                                })
                                        })
                                })
                        })
                })
        })

    })
})
