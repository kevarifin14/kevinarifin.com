import { parseISO, format } from "date-fns";

import { POST_TAGS } from "lib/constants";
import { IRawPost } from "lib/types";

export const parseRawPost = (rawPost: IRawPost) => ({
  ...rawPost,
  date: new Date(rawPost.date),
  displayDate: format(parseISO(rawPost.date), "MMMM d, yyyy"),
  tags: POST_TAGS.filter(({ name }) => rawPost.tags.includes(name)),
});
