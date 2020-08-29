export default ((): {
	url: string;
} => {
	return process.env.NODE_ENV === "development" ? {
		url: "http://localhost:5001/fuhaha-train-view/us-central1/api/graphql",
	} : process.env.NODE_ENV === "production" ? {
		url: "https://us-central1-fuhaha-train-view.cloudfunctions.net/api/graphql",
	} : {
		url: "",
	};
})();