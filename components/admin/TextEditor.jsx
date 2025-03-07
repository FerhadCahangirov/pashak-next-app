"use client"

import React, { useState, useEffect } from 'react'
import { i18nChangeLanguage } from '@wangeditor/editor'

function TextEditor({ html, setHtml }) {
    const [editor, setEditor] = useState(null)
    const [EditorComponent, setEditorComponent] = useState(null)
    const [ToolbarComponent, setToolbarComponent] = useState(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            i18nChangeLanguage('en')

            import('@wangeditor/editor-for-react').then(({ Editor, Toolbar }) => {
                setEditorComponent(() => Editor)
                setToolbarComponent(() => Toolbar)
            })
        }
    }, [])

    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    if (!EditorComponent || !ToolbarComponent) return null // Prevent rendering until loaded

    return (
        <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
            <ToolbarComponent
                editor={editor}
                mode="default"
                style={{ borderBottom: '1px solid #ccc' }}
            />
            <EditorComponent
                value={html}
                onCreated={setEditor}
                onChange={editor => setHtml(editor.getHtml())}
                mode="default"
                style={{ height: '500px', overflowY: 'hidden' }}
            />
        </div>
    )
}

export default TextEditor
