export default function validatePost(value) {
    let errors = {}

    if (!value.trim()) {
        errors.body = "Text is required to make a post.";
    }
    if (value.length > 255) {
        errors.body = "Text must be shorter than 255 characters."
    }

    return errors
}