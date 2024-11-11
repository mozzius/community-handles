import { Collapse } from "@/components/ui/callapse"

export const metadata = {
  title: "FAQ",
  description: "Frequently Asked Questions",
}

export default function CommunityPage() {
  return (
    <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="mx-auto mb-10 flex max-w-[980px] flex-col items-start gap-4">
        <h1 className="text-center text-2xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Frequently Asked Questions
        </h1>
      </div>
      <div className="mx-auto max-w-4xl">
        <Collapse
          items={[
            {
              title: "Will this affect people who follow me?",
              content:
                "You will keep all the followers you currently have, however you may need to update starter packs that you appear in with your new handle.",
            },
            {
              title: "Can I change back to my old handle?",
              content: (
                <div>
                  <p className="mb-2">
                    Yes, you can change back to your old [name].bsky.social at
                    any time as follows:
                  </p>
                  <ol className="list-decimal pl-5">
                    <li>Open the Bluesky App (or webpage on computer)</li>
                    <li>
                      Go to Settings {">"} Advanced {">"} Change Handle
                    </li>
                    <li>Then simply enter the handle you want (old or new)</li>
                  </ol>
                </div>
              ),
            },
            {
              title:
                'It says "Handle not found" when I enter my existing handle in step 1?',
              content: (
                <div>
                  <p>
                    Make sure you copied your existing handle exactly as it
                    appears. It is case-sensitive so check uppercase and
                    lowercase letters
                  </p>
                  <p>
                    Make sure that when you enter your existing handle you
                    don&apos;t include the &apos;@&apos; before it. If you still
                    have issues, tag @chrisrid.fellas.social on Bluesky for
                    help.
                  </p>
                </div>
              ),
            },
            {
              title: 'It says "Invalid Handle" when I type in my new handle:',
              content:
                "Your new handle can only contain letters and numbers. It should appear in the format: [name].fellas.social and make sure 'fellas' is plural, ie 'fellas.social' not 'fella.social'",
            },
            {
              title: "How do I know this is trustworthy?",
              content: (
                <div>
                  <p className="mb-2">
                    This project is open-source, to ensure full transparency.
                    You can view the source code and stay up to date with
                    changes at:
                  </p>
                  <a
                    href="https://github.com/ChrisRid/community-handles"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    https://github.com/ChrisRid/community-handles
                  </a>
                </div>
              ),
            },
            {
              title:
                "How can I make my own custom handles for my community on Bluesky?",
              content: (
                <div>
                  <p className="mb-2">
                    You can. This is based on a project made by mozzius (a
                    Bluesky developer) which is open-source, and he kindly
                    provided plenty of guidance so that others can create their
                    own iterations. Check out his GitHub for more information
                    at:
                  </p>
                  <a
                    href="https://github.com/mozzius/community-handles"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    https://github.com/mozzius/community-handles
                  </a>
                </div>
              ),
            },
          ]}
        />
      </div>
    </main>
  )
}
