import Link from "next/link"

const page = () => {
  return (
    <div>
      {/* For rendering different pages for different blog post like Dynamic routing like post-1 and post-2 etc. */}
      <main>
        <h1>Blogs</h1>
      
      <h3><Link href="/blog/post-1">Post No. 1</Link></h3>
      <h3><Link href="/blog/post-2">Post No. 2</Link></h3>
      </main>
    </div>
  )
}

export default page
