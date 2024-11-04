import { Dispatch } from "redux";
import { getPublications } from "../../api";
import { setPublications } from "./publicationSlice";


export const getAllPublications = () => {

    return async (dispatch: Dispatch) => {

        const res = await getPublications();

        dispatch(setPublications(res));

    };
};
