describe("HTTP Requests", () => {
    it("Get request", () => {
        cy.request
            ({
                method: 'GET',
                url: 'https://jsonplaceholder.typicode.com/posts/1'
            })
            .its('status')
            .should('equal', 200);
    })

    it("Post request", () => {
        cy.request
            ({
                method: 'POST',
                url: 'https://jsonplaceholder.typicode.com/posts/',
                body:
                {
                    title: "Test post",
                    body: "This is post call",
                    userId: 1
                }

            })
            .its('status')
            .should('equal', 201);
    })

    it("Put request", () => {
        cy.request
            ({
                method: 'PUT',
                url: 'https://jsonplaceholder.typicode.com/posts/1',
                body:
                {
                    title: "Test posts - updated",
                    body: "This is put call",
                    userId: 1,
                    id: 1
                }

            })
            .its('status')
            .should('equal', 200);
    })

    it("Delete request", () => {
        cy.request({
            method: 'DELETE',
            url: 'https://jsonplaceholder.typicode.com/posts/1'
        })
            .its('status')
            .should('equal', 200);
    })

})