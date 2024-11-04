function AboutPage() {
  return (
    <section>
      <h1 className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl">
        We love
        <span className="bg-primary py-2 px-4 rounded-lg tracking-widest text-white">
          Regenerative
        </span>
        Farming!
      </h1>
      <p className="mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground">
        By subscribing to any of our CSAs you are supporting local agriculture
        and healthy, pastured food options in our community.
      </p>
      <p className="mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground">
        Our flower farm brings joy to our community and contributes to New
        Jersey's 'Garden State' heritage.
      </p>
      <p className="mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground">
        Check out our full-length feature in Jersey Digest Magazine - Summer 2022 Edition.
      </p>
      {/* Insert Photo with link to the magazine here */}
      <p className="mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto font-bold">
        THANK YOU FOR YOUR SUPPORT!
      </p>
    </section>
  );
}
export default AboutPage;
