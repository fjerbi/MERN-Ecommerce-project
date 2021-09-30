import {
    BLOG_LIST_FAIL,
    BLOG_LIST_SUCCESS,
    BLOG_LIST_REQUEST,
    BLOG_DETAILS_FAIL,
    BLOG_DETAILS_REQUEST,
    BLOG_DETAILS_SUCCESS,
  } from "../constants/blogConstants";
  export const blogListReducer = (state = { blogs: [] }, action) => {
    switch (action.type) {
      case BLOG_LIST_REQUEST:
        return { loading: true, blogs: [] };
      case BLOG_LIST_SUCCESS:
        //if it succeeded getting posts posts will be filled with payload(our results)
        return { loading: false, blogs: action.payload };
      case BLOG_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const blogDetailsReducer = (
    state = { blog: { reviews: [] } },
    action
  ) => {
    switch (action.type) {
      case BLOG_DETAILS_REQUEST:
        return { loading: true, ...state };
      case BLOG_DETAILS_SUCCESS:
        //if it succeeded getting  product will be filled with payload(our results)
        return { loading: false, blog: action.payload };
      case BLOG_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  