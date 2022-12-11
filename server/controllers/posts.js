import Post from "../models/Post.js"
import User from "../models/User.js";

/*
* CREATE
*/
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })

        // Save and grab ALL the posts, updates front end, and how data is recived from back end
        await newPost.save();
        const post = await Post.find()
        res.status(201).json(post);


    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

/*
* READ
*/
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find()
        res.status(200).json(post);

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

// matches the person pofile you click on so you only see thier posts
export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId })
        res.status(200).json(post);

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}


/*
* UPDATE - grab post, grab whether user has liked or not, delete user if its true, else set user, * update the number of likes. pass update post so front end gets updated
*/
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        }
        else {
            post.likes.set(userId, true);
        }

        // Update a specific post
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json(updatedPost);

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
