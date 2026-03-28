"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Section } from "@/components/Section"
import { Lock, Unlock, Plus, Edit2, Trash2, Save, X } from "lucide-react"
import { blogPosts as initialPosts } from "@/lib/data"
import { format } from "date-fns"

export default function BlogAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [passkey, setPasskey] = React.useState("")
  const [error, setError] = React.useState("")
  
  // In-memory state for demo purposes
  const [posts, setPosts] = React.useState(initialPosts)
  const [editingPost, setEditingPost] = React.useState<any | null>(null)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would be an API call to verify against process.env.BLOG_PASSKEY
    // For this demo, we'll hardcode a check or just accept 'adelphi_ai_admin'
    if (passkey === "adelphi_ai_admin") {
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Invalid passkey")
    }
  }

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const newPost = {
      id: editingPost?.id || Math.random().toString(36).substr(2, 9),
      title: formData.get("title") as string,
      slug: (formData.get("title") as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      content: formData.get("content") as string,
      excerpt: formData.get("excerpt") as string,
      author: formData.get("author") as string,
      createdAt: editingPost?.createdAt || new Date(),
      updatedAt: new Date(),
      published: formData.get("published") === "on",
      tags: (formData.get("tags") as string).split(',').map(t => t.trim()).filter(Boolean),
    }

    if (editingPost) {
      setPosts(posts.map(p => p.id === editingPost.id ? newPost : p))
    } else {
      setPosts([newPost, ...posts])
    }
    setEditingPost(null)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter(p => p.id !== id))
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary)_0%,transparent_50%)] opacity-10 blur-[100px]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-8 md:p-12 w-full max-w-md relative z-10"
        >
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[color:var(--muted)] flex items-center justify-center border-2 border-[color:var(--border)] mb-4">
              <Lock className="w-8 h-8 text-[color:var(--primary)]" />
            </div>
            <h1 className="text-2xl font-bold">Admin Access</h1>
            <p className="text-[color:var(--muted-foreground)] text-sm">Enter passkey to manage blog posts</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Enter Passkey"
                className="w-full px-4 py-3 rounded-xl bg-[color:var(--background)] border border-[color:var(--border)] focus:border-[color:var(--primary)] focus:ring-1 focus:ring-[color:var(--primary)] outline-none transition-all text-center tracking-widest"
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
            <button
              type="submit"
              className="w-full px-8 py-4 rounded-xl bg-[color:var(--primary)] text-[color:var(--primary-foreground)] font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Unlock <Unlock className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-primary)_0%,transparent_50%)] opacity-10 blur-[100px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black tracking-tighter mb-2"
            >
              Blog <span className="text-gradient">CMS</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[color:var(--muted-foreground)]"
            >
              Manage your society's publications.
            </motion.p>
          </div>
          
          <button
            onClick={() => setEditingPost({})}
            className="px-6 py-3 rounded-full bg-[color:var(--primary)] text-[color:var(--primary-foreground)] font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New Post
          </button>
        </div>
      </section>

      <Section className="bg-[color:var(--muted)]/30 flex-grow">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          
          {editingPost ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-3xl p-8 md:p-10"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">{editingPost.id ? "Edit Post" : "Create New Post"}</h2>
                <button onClick={() => setEditingPost(null)} className="p-2 rounded-full hover:bg-[color:var(--muted)] transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[color:var(--muted-foreground)]">Title</label>
                    <input name="title" defaultValue={editingPost.title} required className="w-full px-4 py-3 rounded-xl bg-[color:var(--background)] border border-[color:var(--border)] focus:border-[color:var(--primary)] outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[color:var(--muted-foreground)]">Author</label>
                    <input name="author" defaultValue={editingPost.author} required className="w-full px-4 py-3 rounded-xl bg-[color:var(--background)] border border-[color:var(--border)] focus:border-[color:var(--primary)] outline-none" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[color:var(--muted-foreground)]">Excerpt</label>
                  <textarea name="excerpt" defaultValue={editingPost.excerpt} required rows={2} className="w-full px-4 py-3 rounded-xl bg-[color:var(--background)] border border-[color:var(--border)] focus:border-[color:var(--primary)] outline-none resize-none" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[color:var(--muted-foreground)]">Content (Markdown supported in future)</label>
                  <textarea name="content" defaultValue={editingPost.content} required rows={10} className="w-full px-4 py-3 rounded-xl bg-[color:var(--background)] border border-[color:var(--border)] focus:border-[color:var(--primary)] outline-none resize-none font-mono text-sm" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 items-end">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[color:var(--muted-foreground)]">Tags (comma separated)</label>
                    <input name="tags" defaultValue={editingPost.tags?.join(', ')} className="w-full px-4 py-3 rounded-xl bg-[color:var(--background)] border border-[color:var(--border)] focus:border-[color:var(--primary)] outline-none" />
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <input type="checkbox" name="published" id="published" defaultChecked={editingPost.published} className="w-5 h-5 accent-[color:var(--primary)]" />
                    <label htmlFor="published" className="font-medium">Published</label>
                  </div>
                </div>
                
                <div className="flex justify-end gap-4 pt-4 border-t border-[color:var(--border)]">
                  <button type="button" onClick={() => setEditingPost(null)} className="px-6 py-3 rounded-xl font-bold hover:bg-[color:var(--muted)] transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="px-8 py-3 rounded-xl bg-[color:var(--primary)] text-[color:var(--primary-foreground)] font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
                    <Save className="w-4 h-4" /> Save Post
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <div className="glass rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[color:var(--muted)]/50 border-b border-[color:var(--border)]">
                      <th className="p-4 font-bold text-sm uppercase tracking-wider text-[color:var(--muted-foreground)]">Title</th>
                      <th className="p-4 font-bold text-sm uppercase tracking-wider text-[color:var(--muted-foreground)]">Author</th>
                      <th className="p-4 font-bold text-sm uppercase tracking-wider text-[color:var(--muted-foreground)]">Date</th>
                      <th className="p-4 font-bold text-sm uppercase tracking-wider text-[color:var(--muted-foreground)]">Status</th>
                      <th className="p-4 font-bold text-sm uppercase tracking-wider text-[color:var(--muted-foreground)] text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[color:var(--border)]">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-[color:var(--muted)]/30 transition-colors">
                        <td className="p-4 font-medium">{post.title}</td>
                        <td className="p-4 text-sm text-[color:var(--muted-foreground)]">{post.author}</td>
                        <td className="p-4 text-sm text-[color:var(--muted-foreground)]">{format(post.createdAt, "MMM d, yyyy")}</td>
                        <td className="p-4">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${post.published ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                            {post.published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => setEditingPost(post)} className="p-2 rounded-lg hover:bg-[color:var(--primary)]/10 text-[color:var(--primary)] transition-colors" title="Edit">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(post.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {posts.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-[color:var(--muted-foreground)]">
                          No posts found. Create your first one!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
        </div>
      </Section>
    </div>
  )
}
