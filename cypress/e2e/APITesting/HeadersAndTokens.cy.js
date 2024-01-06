describe("headers and tokens", () => {

    let accessToken = null;

    before("generate tokens", () => {
        cy.request(
            {
                method: 'POST',
                url: 'https://simple-books-api.glitch.me/api-clients/',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                body:
                {
                    clientName: 'ABC',
                    clientEmail: Math.random().toString(5).substring(2) + '@test.com'
                }
            })
            .then((response) => {
                accessToken = response.body.accessToken;
            })

    })


it("create new order", () => {
    cy.request(
        {
            method: 'POST',
            url: 'https://simple-books-api.glitch.me/orders/',
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            body:
                {
                    bookId: 1,
                    customerName: 'Raj'
                }
            })
                    .then((response) => {
                        expect(response.status).equal(201)
                        expect(response.body.created).equal(true)
                    })

        })

})
