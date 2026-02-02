def build_comment_tree(comments):
    lookup = {}
    roots = []

    for c in comments:
        c.children_list = []
        lookup[c.id] = c

    for c in comments:
        if c.parent_id:
            lookup[c.parent_id].children_list.append(c)
        else:
            roots.append(c)

    return roots
