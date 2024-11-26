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
              title: "What is this handle for and how did it get here?",
              content: (
                <div>
                  This handle is intended for use by the NAFO Fellas. More
                  information about the fellas can be found on their official
                  website at{" "}
                  <a
                    href="https://nafo-ofan.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    https://nafo-ofan.org
                  </a>
                  . The handle came about during the big transition from X to
                  Bluesky. A unique feature of Bluesky is that people can use
                  their own domain names as Bluesky handles. Samuel, one of the
                  Bluesky developers, created a template service allowing
                  communities to create their own unique handles. The Taylor
                  Swift fan club was quick to adopt this, creating the
                  swifties.social handle. A few NAFO fellas noticed and
                  suggested that the fellas could have their own handle too,
                  using fellas.social as the domain. A few days later,
                  fellas.social was born.
                </div>
              ),
            },
            {
              title: "Will this affect people who follow me?",
              content:
                "You will keep all your followers when you change your handle. Any posts where you're tagged or mentioned will automatically redirect to your new handle. Just keep in mind, though, that once you change your handle, your old handle becomes available for someone else to claim.",
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
                      Go to Settings {">"} Account {">"} Handle
                    </li>
                    <li>Then simply enter the handle you want (old or new)</li>
                  </ol>
                  <p className="mt-2">
                    (Note: When you change your handle, your old handle become
                    available for someone else to use)
                  </p>
                </div>
              ),
            },
            {
              title:
                'It says "Handle not found" when I enter my existing handle in step 1?',
              content: (
                <div>
                  <p>
                    Please ensure that you have copied your existing handle
                    exactly as it appears, without the @ symbol at the
                    beginning. Remember, handles are case sensitive, so
                    double-check for any uppercase or lowercase differences. If
                    Bluesky servers are experiencing high demand, you may need
                    to wait a moment and try again. For additional help, you can
                    tag @chrisrid.fellas.social on Bluesky.
                  </p>
                </div>
              ),
            },
            {
              title: 'It says "Invalid Handle" when I type in my new handle:',
              content:
                "Your new handle can only contain letters, numbers and hyphens. It should appear in the format: [name].fellas.social and make sure 'fellas' is plural, ie 'fellas.social' not 'fella.social'",
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
            {
              title:
                "It's saying I need to be followed by more fellas using this handle?",
              content: (
                <div>
                  <p className="">
                    This is just to help prevent fake accounts from making
                    handles, thereby preserving it for the rest of us. This
                    number is kept fairly low to ensure it shouldn&#39;t be a
                    problem for legitimate fellas. So if you&#39;ve just made an
                    account, spend some more time mingling with the other fellas
                    and you should good to go in no time!
                  </p>
                </div>
              ),
            },
          ]}
        />
      </div>
    </main>
  )
}
