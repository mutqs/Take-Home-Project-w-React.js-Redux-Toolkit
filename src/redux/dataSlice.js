import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

let apiKey1 = "7774c863e99840379d9adb7853b216ee";
let apiKey2 = "JCZy2i3OgQUcy0irfpv54OrbO73tqoCL";
export const apiKey3 = "a7db7adc-6095-4fb4-93e0-97568a965c54";

export const BASE_URL_1 = `https://newsapi.org/v2/everything?language=en&apiKey=${apiKey1}`;
export const BASE_URL_1_1 = `https://newsapi.org/v2/top-headlines?language=en&apiKey=${apiKey1}`;
export const BASE_URL_2 = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey2}`;
export const BASE_URL_3 = `https://content.guardianapis.com/search?page-size=40&api-key=${apiKey3}`;
export const BASE_URL_3_1 = `https://content.guardianapis.com/`;

const initialState = {
  allNews: [],
  allFilteredNews: [],
  newsApiNews: [],
  nyTimesNews: [],
  guardianNews: [],
  staticNews: [],
  sources: [],
  pinnedNews: [],
  resetFlag: false,
  queryAnalytics: [],
  customNews: [],
};

export const fetchFilteredNews = createAsyncThunk(
  "data/fetchFilteredNews",
  async (payloadFromQuery) => {
    try {
      const response = await axios.get(payloadFromQuery.url);
      return {
        payload: response.data,
        source: payloadFromQuery?.source,
        index: payloadFromQuery.index,
      };
    } catch (error) {
      return error.message;
    }
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    filterNews: (state, action) => {
      state.allFilteredNews = [
        ...state.allNews.filter((news) => news?.source == action.payload),
      ];
    },
    dischargeDatas: (state) => {
      state.allNews = [];
      state.sources = [];
    },
    dischargeFilteredNews: (state) => {
      state.allFilteredNews = [];
    },
    dischargeCustomNews: (state) => {
      state.customNews = [];
    },
    setFullFilteredNews: (state) => {
      state.allFilteredNews = state.allNews;
    },
    setResetFlag(state, action) {
      state.resetFlag = action.payload;
    },
    reduceNews(state, action) {
      if (
        action.payload.index == 0 ||
        action.payload.index == 1 ||
        action.payload.index == 2
      ) {
        state.staticNews = [
          ...state.newsApiNews,
          ...state.nyTimesNews,
          ...state.guardianNews,
        ];
      } else if (action.payload.index == 3) {
        state.customNews = [...state.newsApiNews];
      } else if (action.payload.index == 4) {
        state.customNews = [...state.nyTimesNews];
      } else {
        state.allNews = [
          ...state.newsApiNews,
          ...state.nyTimesNews,
          ...state.guardianNews,
        ];
        state.allFilteredNews = state.allNews;
      }

      let sourcesArr = [];
      state.allFilteredNews.forEach((x) => {
        if (sourcesArr.indexOf(x.source) === -1) {
          sourcesArr.push(x.source);
        }
      });
      state.sources = sourcesArr;
    },
    pinNews: (state, action) => {
      let isInclude = state.pinnedNews.some((pinnedNew) => {
        return pinnedNew.id === action.payload.id;
      });
      if (isInclude) {
        state.pinnedNews = [
          ...state.pinnedNews.filter(
            (pinnedNew) => pinnedNew.id != action.payload.id
          ),
        ];
      } else {
        state.pinnedNews = [...state.pinnedNews, action.payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilteredNews.fulfilled, (state, action) => {
      if (action.payload.source == "newsApi") {
        state.newsApiNews = action.payload.payload?.articles.map((item) => {
          return {
            id: uuidv4(),
            source: item?.source.name,
            title: item?.title,
            author: item?.author,
            content: item?.content,
            description: item?.description,
            url: item?.url,
            date: item?.publishedAt,
            image:
              item?.urlToImage ||
              "https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg",
          };
        });
      } else if (action.payload.source == "nyTimes") {
        state.nyTimesNews = action.payload.payload.response.docs.map((item) => {
          return {
            id: uuidv4(),
            source: item?.source,
            title: item?.headline.main,
            author: item?.byline.original,
            content: item?.abstract,
            description: item?.abstract,
            url: item?.web_url,
            date: item?.pub_date,
            image:
              "https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg",
          };
        });
      } else if (action.payload.source == "guardian") {
        state.guardianNews = action.payload.payload.response.results.map(
          (item) => {
            return {
              id: uuidv4(),
              source: "The Guardian",
              title: item?.webTitle,
              author: "",
              content: item?.abstract,
              description: item?.abstract,
              url: item?.webUrl,
              date: item?.webPublicationDate,
              image:
                "https://ichef.bbci.co.uk/news/1024/branded_news/83B3/production/_115651733_breaking-large-promo-nc.png",
            };
          }
        );
      }
      state.newsApiNews = [
        ...state.newsApiNews.filter((x) => !x.title.includes("[Removed]")),
      ];
      dataSlice.caseReducers.reduceNews(state, action);
    });
  },
});

export const {
  dischargeDatas,
  filterNews,
  setFullFilteredNews,
  setResetFlag,
  dischargeFilteredNews,
  pinNews,
  dischargeCustomNews,
} = dataSlice.actions;

export default dataSlice.reducer;
