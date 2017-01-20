import graphql, {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from "graphql/type";

import {
  connectionDefinitions,
  connectionFromArray,
  connectionArgs
} from "graphql-relay";

import find from "lodash/find";
import filter from "lodash/filter";
import oDebug from "debug";
import moment from "moment";
const debug = oDebug("leo-plugin-blogpost:schema");

const BlogPostAttributesType = new GraphQLObjectType({
  name: "BlogPostAttributes",
  fields: {
    title: {
      type: GraphQLString,
      description: "Display title for the BlogPost"
    },
    slug: {
      type: GraphQLString,
      description: "url-safe string for use in URLs. Can be derived from Title, Filename or specified in Frontmatter"
    },
    updatedAt: {
      type: GraphQLString,
      description: "The most recent time that this BlogPost was updated, as `MMM Do, YYYY`"
    },
    publishedAt: {
      type: GraphQLString,
      description: "The time that this BlogPost was published, as `MMM Do, YYYY`"
    },
    url: {
      type: GraphQLString,
      description: "The absolute pathname of the BlogPost, ex. `/post`"
    },
    canonicalURL: {
      type: GraphQLString,
      description: "The Canonical URL for this content. Can be used to deprecate pages for SEO when you want to keep the old content around."
    },
    excerpt: {
      type: GraphQLString,
      description: "A short excerpt of the `body` content"
    },
    timeToRead: {
      type: GraphQLInt,
      description: "The time it takes the average person to read this post in minutes"
    },
    headerImage: {
      type: GraphQLString,
      description: "header.png in the post folder."
    }
  }
});

const BlogPostType = new GraphQLObjectType({
  name: "BlogPost",
  description: "A Blog Post written in Markdown with Frontmatter.",
  fields: {
    attributes: {
      type: BlogPostAttributesType,
      description: "Metadata about the blog post"
    },
    rawBody: {
      type: GraphQLString,
      description: "The raw Markdown, excluding any frontmatter"
    },
    body: { type: GraphQLString, description: "The Markdown rendered as HTML" }
  }
});

// Helper to create a Connection for Relay (paging, etc)
const { connectionType: BlogPostConnection } = connectionDefinitions({
  nodeType: BlogPostType
});

module.exports = function(data) {
  // The set of posts we should return via the API
  const allPosts = data
    .filter(post => post.attributes.contentType === "leo-blogpost")
    .sort((postA, postB) => {
      const a = moment.utc(postA.attributes.updatedAt, "MMM Do, YYYY");
      const b = moment.utc(postB.attributes.updatedAt, "MMM Do, YYYY");
      return b.diff(a);
    });

  // Get a single post by slug
  const getPost = slug => {
    const post = find(
      allPosts,
      ({ attributes: a }) => a ? a.slug === slug : false
    );
    if (!post) {
      console.log(
        "leo-plugin-blogpost could not find",
        slug,
        "It may be useful to define `slug` in the frontmatter for this post"
      );
    }
    return post;
  };

  return {
    post: {
      type: BlogPostType,
      args: {
        slug: {
          type: GraphQLString,
          description: "The slugified version of a post title"
        }
      },
      resolve: (root, { slug }) => getPost(slug)
    },
    posts: {
      type: BlogPostConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(allPosts, args)
    }
  };
};
