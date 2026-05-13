import { Switch, Route } from "wouter";
import Portfolio from "@/pages/Portfolio";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminBlogs from "@/pages/AdminBlogs";
import AdminBlogEditor from "@/pages/AdminBlogEditor";
import AdminExperience from "@/pages/AdminExperience";
import AdminGallery from "@/pages/AdminGallery";
import AdminSkills from "@/pages/AdminSkills";
import AdminProjects from "@/pages/AdminProjects";
import AdminContent from "@/pages/AdminContent";

function App() {
  return (
    <Switch>
      <Route path="/" component={Portfolio} />
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/blogs" component={AdminBlogs} />
      <Route path="/admin/blogs/new" component={AdminBlogEditor} />
      <Route path="/admin/blogs/:id" component={AdminBlogEditor} />
      <Route path="/admin/experience" component={AdminExperience} />
      <Route path="/admin/gallery" component={AdminGallery} />
      <Route path="/admin/skills" component={AdminSkills} />
      <Route path="/admin/projects" component={AdminProjects} />
      <Route path="/admin/content" component={AdminContent} />
    </Switch>
  );
}

export default App;