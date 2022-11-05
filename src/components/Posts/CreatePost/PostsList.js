import { useEffect } from "react";
import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  fetchAllPostAction,
  toggleAddDisLikesToPost,
  toggleAddLikesToPost,  searchPostAction,
} from "../../../redux/slices/Posts/PostSlices";
import { fetchCatagoriesAction } from "../../../redux/slices/category/categorySlice";
import LoadingComponent from "../../../utils/LoadingComponent";
import DateFormatter from "../../../utils/DateFormatter";
import * as DOMPurify from "dompurify";
import { useState } from "react";
import { userProfileAction } from "../../../redux/slices/users/usersSlices";

export default function PostsList() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(fetchAllPostAction(""));
  }, [dispatch]);

  //select post from store
  const posts = useSelector((state) => state?.post);
  const { postLists, loading, appErr, serverErr, likes, dislikes } = posts;


  const users = useSelector((state) => state?.users);
  const {userAuth,profile}  =users
  //User data from store
  const category = useSelector((state) => state?.category);
  const {
    categoryList,
    loading: catLoading,
    appErr: catAppErr,
    serverErr: catServerErr,
  } = category;
  //fetch category
  useEffect(() => {
    dispatch(fetchCatagoriesAction(""));
  }, [dispatch, likes, dislikes]);
  useEffect(() => {
    dispatch(userProfileAction(id));
  }, [id, dispatch]);


  return (
    <>
      <section>
        <div class="py-20 bg-white-100 min-h-screen radius-for-skewed">
          <div class="container mx-auto px-4">
            
            <div class="flex flex-wrap -mx-3">
              {/* <div class="mb-8 lg:mb-0 w-full lg:w-1/4 px-3">
                <div class="py-4 px-6 bg-gray-900 shadow rounded">
                  <h4 class="mb-4 text-gray-500 font-bold uppercase">
                    Categories
                  </h4>
                  <ul>
                    {catLoading ? (
                      <LoadingComponent />
                    ) : catAppErr || catServerErr ? (
                      <h1>
                        {catServerErr} {catAppErr}
                      </h1>
                    ) : categoryList?.length <= 0 ? (
                      <h1 className="text-yellow-400 text-lg text-center">
                        No category found
                      </h1>
                    ) : (
                      categoryList?.map((category) => (
                        <li>
                          <p
                            onClick={() =>
                              dispatch(fetchAllPostAction(category?.title))
                            }
                            className="block cursor-pointer py-2 px-3 mb-4 rounded text-yellow-500 font-bold bg-gray-500"
                          >
                            {category?.title}
                          </p>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div> */}
             
             <div class="mb-8 lg:mb-0 w-full lg:w-1/4 px-3">
                <div class="py-4 px-6 bg-gray-50 shadow rounded border border-gray-300 fixed">
                  <h4 class="mb-4 text-slate-700 font-bold uppercase flex justify-center">
                    Categories
                  </h4>
                  <ul className="overflow-auto h-80">
                    {/* <p
                      onClick={() => dispatch(fetchAllPostAction())}
                      className="cursor-pointer py-2 px-3 mb-4 rounded text-white font-bold bg-gray-700 flex justify-center"
                    >
                      View All Posts
                    </p> */}
                    {catLoading ? (
                      <LoadingComponent />
                    ) : catAppErr || catServerErr ? (
                      <h1>
                        {catServerErr} {catAppErr}
                      </h1>
                    ) : categoryList?.length <= 0 ? (
                      <h1>No Category Found</h1>
                    ) : (
                      categoryList?.map((category) => (
                        <li>
                          <p
                            onClick={() =>
                              dispatch(fetchAllPostAction(category?.title))
                            }
                            className="cursor-pointer py-2 px-3 mb-4 rounded text-white font-bold bg-gray-700 flex justify-center"
                          >
                            {category?.title}
                          </p>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>






              <div class="w-full lg:w-3/4 px-3">
                {/* Post goes here */}

                {loading ? (
                  <h1>Loading...</h1>
                ) : appErr || serverErr ? (
                  <h1>Err</h1>
                ) : postLists?.length <= 0 ? (
                  <h1 className="text-yellow-400 text-lg text-center">
                    No Post Found
                  </h1>
                ) : (
                  postLists?.map((post) => (
                    <div
                      key={post.id}
                      class="flex flex-wrap bg-gray-400 -mx-3  lg:mb-6"
                    >
                      <div class="mb-10  w-full lg:w-1/4 ">
                        <Link>
                          {/* Post image */}
                          <img
                            class="w-full h-full object-cover rounded"
                            src={post?.image}
                            alt=""
                          />
                        </Link>
                       
                        {/* Likes, views dislikes */}
                        <div className="flex flex-row bg-gray-300 justify-center w-full  items-center ">
                          {/* Likes */}
                          <div className="flex flex-row justify-center items-center ml-4 mr-2 pb-2 pt-1">
                            {/* Togle like  */}
                            {post?.likes.includes(userAuth?._id) ? (
                              <div className="">
                                <ThumbUpIcon
                                  onClick={() =>
                                    dispatch(toggleAddLikesToPost(post?._id))
                                  }
                                  className="h-7 w-7 text-blue-600 cursor-pointer"
                                />
                              </div>
                            ) : (
                              <div className="">
                                <ThumbUpIcon
                                  onClick={() =>
                                    dispatch(toggleAddLikesToPost(post?._id))
                                  }
                                  className="h-7 w-7 text-gray-600 cursor-pointer"
                                />
                              </div>
                            )}

                            <div className="pl-1 text-gray-600">
                              {post?.likes?.length}
                            </div>
                          </div>

                          {/* Dislike */}
                          <div className="flex flex-row  justify-center items-center ml-4 mr-4 pb-2 pt-1">
                            {post?.disLikes.includes(userAuth?._id) ? (
                              <div>
                                <ThumbDownIcon
                                  onClick={() =>
                                    dispatch(toggleAddDisLikesToPost(post?._id))
                                  }
                                  className="h-7 w-7 cursor-pointer text-black"
                                />
                              </div>
                            ) : (
                              <div>
                                <ThumbDownIcon
                                  onClick={() =>
                                    dispatch(toggleAddDisLikesToPost(post?._id))
                                  }
                                  className="h-7 w-7 cursor-pointer text-gray-600"
                                />
                              </div>
                            )}

                            <div className="pl-1 text-gray-600">
                              {post?.disLikes?.length}
                            </div>
                          </div>
                          {/* Views */}
                          {/* <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                            <div>
                              <EyeIcon className="h-7 w-7  text-gray-400" />
                            </div>
                            <div className="pl-1 text-gray-600">
                            {profile?.viewedBy?.length}
                            </div>
                          </div> */}
                        </div>
                      </div>
                      <div class="w-full lg:w-3/4 px-3">
                        <Link class="hover:underline">
                          <h3 class="mb-1 text-2xl text-black font-bold font-heading">
                            {/* {capitalizeWord(post?.title)} */}
                            {post?.title}
                          </h3>
                        </Link>
                        <div
                          className="text-black truncate "
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(post?.description),
                          }}
                        ></div>
                      
                        {/* Read more */}
                        <div className="mt-5">
                          <Link
                            to={`/posts/${post?._id}`}
                            className=" text-gray-900 hover:underline "
                          >
                            Read More..
                          </Link>
                        </div>
                        {/* User Avatar */}
                        <div className="mt-6 flex items-center">
                          <div className="flex-shrink-0">
                            <Link>
                              <img
                                className="h-10 w-10 rounded-full"
                                src={post?.user?.profilePhoto}
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              <Link
                                to={`/profile/${post?.user?._id}`}
                                className="text-black font-extrabold hover:underline "
                              >
                                {post?.user?.firstName} {post?.user?.lastName}
                              </Link>
                            </p>
                            <div className="flex space-x-1 text-sm text-black">
                              <time>
                                <DateFormatter date={post.createdAt}/>
                              </time>
                              {/* <span aria-hidden="true">&middot;</span> */}
                            </div>
                          </div>
                        </div>
                        {/* <p class="text-gray-500">
                             Quisque id sagittis turpis. Nulla sollicitudin rutrum
                             eros eu dictum...
                           </p> */}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
