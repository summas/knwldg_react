export const truncateString = (title: String, len: number) => {
    return (title.length <= len ? title : (title.substr(0, len) + "..."));
};