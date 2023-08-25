const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path");

// setup call hbs with sub folder
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// set serving static file
app.use(express.static(path.join(__dirname, "src/assets")));

// parsing data
app.use(express.urlencoded({ extended: false }));

// dummy data
const dataBlog = [
	{
		title: "Dumbways Mobile App - 2021",
		content:
			"App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download",
		images: "/images/project.jpeg",
	},
	{
		title: "Dumbways Mobile App - 2021",
		content:
			"App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download",
		images: "/images/project.jpeg",
	},
	{
		title: "Dumbways Mobile App - 2021",
		content:
			"App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download",
		images: "/images/project.jpeg",
	},
	{
		title: "Dumbways Mobile App - 2021",
		content:
			"App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download",
		images: "/images/project.jpeg",
	},
	{
		title: "Dumbways Mobile App - 2021",
		content:
			"App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download",
		images: "/images/project.jpeg",
	},
];

// routing
app.get("/", home);
app.get("/blog", blog);
app.post("/blog", addBlog);
app.get("/blog-detail/:id", blogDetail);
app.get("/contact", contactMe);
app.get("/delete-blog/:id", deleteBlog);
app.get("/edit-blog/:id", editBlog);
app.post("/update-blog/:id", updateBlog);

// local server
app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});

// module.exports = app;

// index
function home(req, res) {
	res.render("index", { dataBlog });
}

// blog
function blog(req, res) {
	res.render("blog");
}

// add a new blog
function addBlog(req, res) {
	const { title, startDate, endDate, content, images } = req.body;

	const data = {
		title,
		content,
		images,
		startDate,
		endDate,
	};

	dataBlog.push(data);
	res.redirect("/");
}

// edit blog
function editBlog(req, res) {
	const id = parseInt(req.params.id);
	res.render("edit-blog", { blog: dataBlog[id], blogIndex: id });
}

// update blog
function updateBlog(req, res) {
	const blogIndex = parseInt(req.body.blogIndex);
	const { title, content } = req.body;

	dataBlog[blogIndex].title = title;
	dataBlog[blogIndex].content = content;

	res.redirect("/");
}

// blog detail
function blogDetail(req, res) {
	const { id } = req.params;

	res.render("blog-detail", { blog: dataBlog[id] });
}

// contact me
function contactMe(req, res) {
	res.render("contact");
}

// Delete blog
function deleteBlog(req, res) {
	const { id } = req.params;

	dataBlog.splice(id, 1);
	res.redirect("/");
}
