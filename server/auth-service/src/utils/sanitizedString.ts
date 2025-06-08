import sanitizeHtml from "sanitize-html"

export function sanitizedObject(obj: Record<string, any>):Record<string,any>{
    const sanitized:Record<string,any> = {}
    for (const key in obj) {
        if (typeof obj[key] == "string"){
            sanitized[key] = sanitizeHtml(obj[key].trim(),{
                allowedTags: ['li','b', 'i', 'em', 'strong', 'a','ol','br'],
                allowedAttributes:{
                    a: ['href', 'rel','target'],
                },
            })
        }
    }
    return sanitized
}