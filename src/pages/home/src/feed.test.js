import { applySearch } from "./util";

const dummyPollData = [
    {
        id: 1,
        title: "Poll 1",
        content: "Poll 1 content",
        author: "Poll 1 author",
        createdAt: new Date("2021-01-01"),
        upvotes: [1, 2, 3],
        downvotes: [],
    },
    {
        id: 2,
        title: "Poll 2",
        content: "Poll 2 content",
        author: "Poll 2 author",
        createdAt: new Date("2021-01-02"),
        upvotes: [1, 2],
        downvotes: [4, 5, 6],
    },
    {
        id: 3,
        title: "Poll 3",
        content: "Poll 3 content",
        author: "Poll 3 author",
        createdAt: new Date("2021-01-03"),
        upvotes: [1],
        downvotes: [4, 5, 6, 7, 8, 9],
    },
];

describe("Feed", () => {
    it("will search by text", () => {
        // given
        const searchData = {
            search: "Poll 1",
        };

        // when
        const filtered = applySearch(searchData, dummyPollData);

        // then
        expect(filtered).toHaveLength(1);
    });

    it("will apply filter correctly", () => {
        // given
        const searchData = {
            filter: "upvoted",
        };

        // when
        const filtered = applySearch(searchData, dummyPollData);

        // then
        expect(filtered).toHaveLength(1);

        // given
        searchData.filter = "downvoted";

        // when
        const filtered2 = applySearch(searchData, dummyPollData);

        // then
        expect(filtered2).toHaveLength(2);

        // given
        searchData.filter = "none";

        // when
        const filtered3 = applySearch(searchData, dummyPollData);

        // then
        expect(filtered3).toHaveLength(3);
    });

    it("will sort by popularity correctly ascending", () => {
        // given
        const searchData = {
            sort: "popularity",
            sortDir: "asc",
        };

        // when
        const filtered = applySearch(searchData, dummyPollData);

        // then
        expect(filtered).toHaveLength(3);
        expect(filtered[0].id).toBe(1);
        expect(filtered[1].id).toBe(2);
        expect(filtered[2].id).toBe(3);
    });

    it("will sort by popularity correctly descending", () => {
        // given
        const searchData = {
            sort: "popularity",
            sortDir: "desc",
        };

        // when
        const filtered = applySearch(searchData, dummyPollData);

        // then
        expect(filtered).toHaveLength(3);
        expect(filtered[0].id).toBe(3);
        expect(filtered[1].id).toBe(2);
        expect(filtered[2].id).toBe(1);
    });

    it("will sort by upvotes correctly ascending", () => {
        // given
        const searchData = {
            sort: "upvotes",
            sortDir: "asc",
        };

        // when
        const filtered = applySearch(searchData, dummyPollData);

        // then
        expect(filtered).toHaveLength(3);
        expect(filtered[0].id).toBe(3);
        expect(filtered[1].id).toBe(2);
        expect(filtered[2].id).toBe(1);
    });

    it("will sort by upvotes correctly descending", () => {
        // given
        const searchData = {
            sort: "upvotes",
            sortDir: "desc",
        };

        // when
        const filtered = applySearch(searchData, dummyPollData);

        // then
        expect(filtered).toHaveLength(3);
        expect(filtered[0].id).toBe(1);
        expect(filtered[1].id).toBe(2);
        expect(filtered[2].id).toBe(3);
    });

    it("will sort by downvotes correctly ascending", () => {
        // given
        const searchData = {
            sort: "downvotes",
            sortDir: "asc",
        };

        // when
        const filtered = applySearch(searchData, dummyPollData);

        // then
        expect(filtered).toHaveLength(3);
        expect(filtered[0].id).toBe(1);
        expect(filtered[1].id).toBe(2);
        expect(filtered[2].id).toBe(3);
    });

    it("will sort by downvotes correctly descending", () => {
        // given
        const searchData = {
            sort: "downvotes",
            sortDir: "desc",
        };

        // when
        const filtered = applySearch(searchData, dummyPollData);

        // then
        expect(filtered).toHaveLength(3);
        expect(filtered[0].id).toBe(3);
        expect(filtered[1].id).toBe(2);
        expect(filtered[2].id).toBe(1);
    });

    it("will sort by date correctly ascending", () => {
        // given
        const searchData = {
            sort: "newest",
            sortDir: "asc",
        };

        // when
        const filtered = applySearch(searchData, dummyPollData);

        // then
        expect(filtered).toHaveLength(3);
        expect(filtered[0].id).toBe(1);
        expect(filtered[1].id).toBe(2);
        expect(filtered[2].id).toBe(3);
    });

    it("will sort by date correctly descending", () => {
        // given
        const searchData = {
            sort: "newest",
            sortDir: "desc",
        };

        // when
        const filtered = applySearch(searchData, dummyPollData);

        // then
        expect(filtered).toHaveLength(3);
        expect(filtered[0].id).toBe(3);
        expect(filtered[1].id).toBe(2);
        expect(filtered[2].id).toBe(1);
    });
});
