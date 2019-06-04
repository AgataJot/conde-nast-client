import React from "react";
import App from "./App";
import { shallow } from "enzyme";
import API from "./api";

function flushPromises() {
    return new Promise(resolve => setImmediate(resolve));
}

describe("App", () => {
    describe("news api key input", () => {
        it("renders the token input field if no newsapi api key present in session", async done => {
            API.checkHasAPIKey = jest.fn(() => Promise.resolve(false));

            let app = shallow(<App />);
            await flushPromises();

            expect(API.checkHasAPIKey).toHaveBeenCalled();
            expect(
                app.find({ title: "Your newsapi.org API key" }),
            ).toHaveLength(1);

            done();
        });
        it("renders the search input form if newsapi api key present in session", async done => {
            API.checkHasAPIKey = jest.fn(() => Promise.resolve(true));

            let app = shallow(<App />);
            await flushPromises();

            expect(API.checkHasAPIKey).toHaveBeenCalled();
            expect(
                app.find({ title: "Your newsapi.org API key" }),
            ).not.toHaveLength(1);
            expect(app.find({ title: "Search newsapi.org" })).toHaveLength(1);

            done();
        });
        it.todo(
            "lets the user delete the newsapi token from the server session",
        );
    });

    describe("search results", () => {
        it.todo("renders results of a new search upon submit");
        it.todo("displays error message is server request errors");
    });

    describe("recent searches list", () => {
        it.todo("renders the recent searches list if server returns any");
        it.todo("lets the user flush recent searches");
        it.todo("loads results of recent search");
    });
});
