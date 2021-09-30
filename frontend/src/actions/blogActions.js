import {
    BLOG_LIST_SUCCESS,
    BLOG_LIST_REQUEST,
    BLOG_LIST_FAIL,
    BLOG_DETAILS_FAIL,
    BLOG_DETAILS_REQUEST,
    BLOG_DETAILS_SUCCESS,
  } from "../constants/blogConstants";
  import axios from "axios";
  
  export const listBlogs = () => async (dispatch) => {
    try {
      dispatch({ type: BLOG_LIST_REQUEST });
  
      const { data } = await axios.get("/api/blog");
      dispatch({
        type: BLOG_LIST_SUCCESS,
        //I need to fill payload with data because as mentiond in the reducer
        //our products will be fetched from the payload itself
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BLOG_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const listBlogDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: BLOG_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/api/blog/${id}`);
      dispatch({
        type: BLOG_DETAILS_SUCCESS,
        //I need to fill payload with data because as mentiond in the reducer
        //our products will be fetched from the payload itself
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BLOG_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  