import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter, getFileBySlug } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PostFrontMatter } from 'types/PostFrontMatter'
import NewsletterForm from '@/components/NewsletterForm'
import { AuthorFrontMatter } from '../types/AuthorFrontMatter'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from '@/components/Image'

const MAX_DISPLAY = 5

//@ts-ignore
export const getStaticProps: GetStaticProps<{
  posts: PostFrontMatter[]
  authorDetails: { mdxSource: string; frontMatter: AuthorFrontMatter }
}> = async () => {
  const posts = await getAllFilesFrontMatter('blog')

  const authorDetails = await getFileBySlug<AuthorFrontMatter>('authors', ['default'])
  const { mdxSource, frontMatter } = authorDetails

  return { props: { posts, authorDetails: { mdxSource, frontMatter } } }
}

export default function Home({
  posts,
  authorDetails,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const AuthorContent = getMDXComponent(authorDetails.mdxSource)
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          hi! 👋 nice to meet you
        </h1>
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          i'm dov
        </h1>
        <div className="pb-0.5 md:pb-8 flex flex-col md:flex-row">
          <div className="pt-8 rounded-2xl basis-1/2">
            <Image
              src={'/static/images/headshot.png'}
              width={2517}
              height={1669}
              layout="responsive"
              alt="Dov Alperin Headshot"
            />
          </div>
          <div className="aboutContent pt-8 md:px-8 homepageText space-y-5 basis-3/4">
            <AuthorContent />
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 py-2 md:py-0">
            <b>Programming languages</b>
            <ul>
              <li>Javascript + Typescript</li>
              <li>Golang</li>
              <li>Python</li>
              <li>Ruby</li>
              <li>C++</li>
            </ul>
          </div>
          <div className="flex-1 py-2 md:py-0">
            <b>Web technologies</b>
            <ul>
              <li>React</li>
              <li>Node JS</li>
              <li>Ruby on Rails</li>
            </ul>
          </div>
          <div className="flex-1 py-2 md:py-0">
            <b>Databases</b>
            <ul>
              <li>Postgresql</li>
              <li>Mongodb</li>
              <li>Redis</li>
              <li>Kafka</li>
            </ul>
          </div>
          <div className="flex-1 py-2 md:py-0">
            <b>Data science</b>
            <ul>
              <li>Jupyter(lab, notebooks)</li>
              <li>Numpy</li>
              <li>NASA Panoply</li>
              <li>Basic R and Matlab</li>
            </ul>
          </div>
        </div>
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest posts
          </h1>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {/*{siteMetadata.newsletter.provider !== '' && (*/}
      {/*  <div className="flex items-center justify-center pt-4">*/}
      {/*    <NewsletterForm />*/}
      {/*  </div>*/}
      {/*)}*/}
    </>
  )
}
