const page = ({params,searchParams}) => {
  return (
    <main>
        <h1> Blog Posts</h1>
        
        {/* To access the dynamic url id, use the optional props passed.*/}
        {params.slug}
    </main>
  )
}

export default page
