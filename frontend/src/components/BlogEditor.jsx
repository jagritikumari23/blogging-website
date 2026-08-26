import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const BlogEditor = ({ content, setContent }) => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'blockquote'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'blockquote'
  ]

  return (
    <div className="bg-white">
      <ReactQuill
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        placeholder="Write your blog content..."
        className="min-h-[300px]"
      />
    </div>
  )
}

export default BlogEditor
