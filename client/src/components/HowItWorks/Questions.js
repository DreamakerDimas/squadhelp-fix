import React from 'react';
import styles from './Questions.module.sass';
import CONSTANTS from '../../constants';
import { Accordion, Nav, Card, Button, Tab, Row, Col } from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import 'bootstrap/scss/bootstrap.scss';

const Questions = () => {
  return (
    <div className={styles.mainContainer}>
      <Tab.Container id="questions-tabs" defaultActiveKey="launchingContest">
        <Row>
          <Col sm={3}>
            <Nav
              variant="pills"
              className="js-sticky-block card border-0 bg-primary py-3 px-5"
            >
              <Nav.Item>
                <Nav.Link
                  className="text-light row-sm-1"
                  eventKey="launchingContest"
                >
                  Launching A Contest
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className="text-light"
                  eventKey="buyingFromMarketplace"
                >
                  Buying From Marketplace
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-light" eventKey="managedContests">
                  Managed Contests
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-light" eventKey="forCreatives">
                  For Creatives
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="launchingContest">
                <h2 className={styles.tabPaneTitle}>Launching A Contest</h2>
                <Accordion>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle
                        as={Button}
                        variant="light"
                        eventKey="0"
                      >
                        How long does it take to start receiving submissions?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        For Naming contests, you will start receiving your
                        submissions within few minutes of launching your
                        contest. Since our creatives are located across the
                        globe, you can expect to receive submissions 24 X 7
                        throughout the duration of the brainstorming phase.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header className="accordion-header">
                      <Accordion.Toggle
                        as={Button}
                        variant="light"
                        eventKey="1"
                      >
                        How long do Naming Contests last?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        You can choose a duration from 1 day to 7 days. We
                        recommend a duration of 3 Days or 5 Days. This allows
                        for sufficient time for entry submission as well as
                        brainstorming with creatives. If you take advantage of
                        our validation services such as Audience Testing and
                        Trademark Research, both will be an additional 4-7 days
                        (3-5 business days for Audience Testing and 1-2 business
                        days for Trademark Research).
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header className="accordion-header">
                      <Accordion.Toggle
                        as={Button}
                        variant="light"
                        eventKey="2"
                      >
                        Where are the creatives located?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body>
                        About 70% of our Creatives are located in the United
                        States and other English speaking countries (i.e. United
                        Kingdom, Canada, and Australia.). We utilize an advanced
                        rating score algorithm to ensure that high quality
                        creatives receive more opportunities to participate in
                        our contests.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header className="accordion-header">
                      <Accordion.Toggle
                        as={Button}
                        variant="light"
                        eventKey="3"
                      >
                        What if I do not like any submissions?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="3">
                      <Card.Body>
                        While it is unusually rare that you will not like any
                        names provided, we have a few options in case this
                        problem occurs:
                        <ul className={styles.markedList}>
                          <li>
                            If the contest ends and you have not yet found a
                            name that you’d like to move forward with, we can
                            provide complimentary extension of your contest as
                            well as a complimentary consultation with one of our
                            branding consultants (a $99 value).
                          </li>
                          <li>
                            By exploring our premium domain marketplace you can
                            apply the contest award towards the purchase of any
                            name listed for sale.
                          </li>
                          <li>
                            If you choose the Gold package or Platinum package
                            and keep the contest as "Not Guaranteed", you can
                            request a partial refund if you choose not to move
                            forward with any name from you project. (Please note
                            that the refund is for the contest award). Here is a
                            link to our{' '}
                            <a href="https://www.google.com" target="_blank">
                              Refund Policy
                            </a>
                          </li>
                        </ul>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle
                        as={Button}
                        variant="light"
                        eventKey="4"
                      >
                        How mach does it costs?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="4">
                      <Card.Body>
                        Our naming competitions start at $299, and our logo
                        design competitions start at $299. Also, there are three
                        additional contest level that each offer more features
                        and benefits. See our Pricing Page for details.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header className="accordion-header">
                      <Accordion.Toggle
                        as={Button}
                        variant="light"
                        eventKey="5"
                      >
                        I need both a Name and a Logo. Do you offer any discount
                        for multiple contests?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="5">
                      <Card.Body>
                        Yes! We have many contest bundles - our most popular
                        being our Name, Tagline, and Logo bundle. Bundles allow
                        you to purchase multiple contests at one time and save
                        as much as from $75 - $400. You can learn more about our
                        bundle options on our{' '}
                        <a href="https://www.google.com" target="_blank">
                          Pricing Page
                        </a>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header className="accordion-header">
                      <Accordion.Toggle
                        as={Button}
                        variant="light"
                        eventKey="6"
                      >
                        What if I want to keep my business idea private?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="6">
                      <Card.Body>
                        You can select a Non Disclosure Agreement (NDA) option
                        at the time of launching your competition. This will
                        ensure that only those contestants who agree to the NDA
                        will be able to read your project brief and participate
                        in the contest. The contest details will be kept private
                        from other users, as well as search engines.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header className="accordion-header">
                      <Accordion.Toggle
                        as={Button}
                        variant="light"
                        eventKey="7"
                      >
                        Can you serve customers outside the US?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="7">
                      <Card.Body>
                        Absolutely. Squadhelp services organizations across the
                        globe. Our customer come from many countries, such as
                        the United States, Australia, Canada, Europe, India, and
                        MENA. We’ve helped more than 25,000 customer around the
                        world.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header className="accordion-header">
                      <Accordion.Toggle
                        as={Button}
                        variant="light"
                        eventKey="8"
                      >
                        Can I see any examples?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="8">
                      <Card.Body>
                        Our creatives have submitted more than 6 Million names
                        and thousands of logos on our platform. Here are some
                        examples of Names, Taglines, and Logos that were
                        submitted in recent contests.
                        <ul className={styles.markedList}>
                          <li>
                            <a href="https://www.google.com" target="_blank">
                              Name Examples
                            </a>
                          </li>
                          <li>
                            <a href="https://www.google.com" target="_blank">
                              Tagline Examples
                            </a>
                          </li>
                          <li>
                            <a href="https://www.google.com" target="_blank">
                              Logo Examples
                            </a>
                          </li>
                        </ul>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Tab.Pane>

              <Tab.Pane eventKey="buyingFromMarketplace">
                <h2 className={styles.tabPaneTitle}>Buying From Marketplace</h2>
                <Accordion>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle
                        as={Button}
                        variant="light"
                        eventKey="9"
                      >
                        What's included with a Domain Purchase?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="9">
                      <Card.Body>
                        When you purchase a domain from our premium domain
                        marketplace, you will receive the exact match .com URL,
                        a complimentary logo design (along with all source
                        files), as well as a complimentary Trademark report and
                        Audience Testing if you’re interested in validating your
                        name.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle
                        as={Button}
                        variant="light"
                        eventKey="10"
                      >
                        How does the Domain transfer process work?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="10">
                      <Card.Body>
                        Once you purchase a Domain, our transfer specialists
                        will reach out to you (typically on the same business
                        day). In most cases we can transfer the domain to your
                        preferred registrar (such as GoDaddy). Once we confirm
                        the transfer details with you, the transfers are
                        typically initiated to your account within 1 business
                        day.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle
                        as={Button}
                        variant="light"
                        eventKey="11"
                      >
                        If I purchase a Domain on installments, can I start
                        using it to setup my website?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="11">
                      <Card.Body>
                        We offer payment plans for many domains in our
                        Marketplace. If you purchase a domain on a payment plan,
                        we hold the domain in an Escrow account until it is
                        fully paid off. However our team can assist you with
                        making any changes to the domains (such as Nameserver
                        changes), so that you can start using the domain right
                        away after making your first installment payment.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Tab.Pane>

              <Tab.Pane eventKey="managedContests">
                <h2 className={styles.tabPaneTitle}>Managed Contests</h2>
                <Accordion>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle
                        as={Button}
                        variant="light"
                        eventKey="12"
                      >
                        What are Managed Contests?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="12">
                      <Card.Body>
                        The 'Managed' option is a fully managed service by
                        Squadhelp Branding experts. It includes a formal brief
                        preparation by Squadhelp team and management of your
                        contest. Managed Contests are a great fit for companies
                        that are looking for an "Agency" like experience and
                        they do not want to manage the contest directly. Our
                        branding team has directly managed hundreds of branding
                        projects and has learned several best practices that
                        lead to successful project outcomes. Our team will apply
                        all best practices towards the management of your
                        branding project. Learn more about our{' '}
                        <a href="https://www.google.com" target="_blank">
                          Managed Contest Service
                        </a>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle
                        as={Button}
                        variant="light"
                        eventKey="13"
                      >
                        What's a typical timeline for a Managed Contest?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="13">
                      <Card.Body>
                        The overall process takes 12-13 days.
                        <ul className={styles.markedList}>
                          <li>
                            The Managed projects start with a project kick-off
                            call with your Branding Consultant. You can schedule
                            this call online immediately after making your
                            payment.
                          </li>
                          <li>
                            After your kick-off call, the Branding consultant
                            will write your project brief and send for your
                            approval within 1 business day.
                          </li>
                          <li>
                            Upon your approval, the contest will go live. The
                            branding consultant will help manage your project
                            throughout the brainstorming phase (typically 5
                            days).
                          </li>
                          <li>
                            Upon the completion of brainstorming phase, the
                            branding consultant will work with you to test the
                            top 6 names from your Shortlist (3-5 Days). In
                            addition, the branding consultant will coordinate
                            the detailed Trademark screening (1-3 days)
                          </li>
                        </ul>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle
                        as={Button}
                        variant="light"
                        eventKey="14"
                      >
                        How much do Managed Contests cost?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="14">
                      <Card.Body>
                        We offer two levels of Managed Contests. Standard ($999)
                        and Enterprise ($1999). The Enterprise managed contest
                        includes:
                        <ul className={styles.markedList}>
                          <li>
                            (1) a $500 award amount (instead of $300), which
                            will attract our top Creatives and provide more
                            options to choose from;
                          </li>
                          <li>
                            (2) we will ensure a senior member of our branding
                            team is assigned to your project and the branding
                            team will invest about 3X more time in the
                            day-to-day management of your project;
                          </li>
                          <li>
                            (3) you will receive more high-end trademark report
                            and 5X more responses for your audience test.
                          </li>
                          <li>
                            Here is a link to our{' '}
                            <a href="https://www.google.com" target="_blank">
                              Pricing page
                            </a>{' '}
                            with a detailed comparison of the two packages.
                          </li>
                        </ul>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle
                        as={Button}
                        variant="light"
                        eventKey="15"
                      >
                        Where are the Branding Consultants located?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="15">
                      <Card.Body>
                        All our branding consultants are based in in our
                        Headquarters (Hoffman Estates, IL). Our branding
                        consultants have many years of experience in managing
                        hundreds of branding projects for companies ranging from
                        early stage startups to Fortune 500 corporations.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Tab.Pane>

              <Tab.Pane eventKey="forCreatives">
                <h2 className={styles.tabPaneTitle}>For Creatives</h2>
                <Accordion>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle
                        as={Button}
                        variant="light"
                        eventKey="16"
                      >
                        Can anyone join your platform?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="16">
                      <Card.Body>
                        We are open to anyone to signup. However, we have an
                        extensive "Quality Scoring" process which ensures that
                        high quality creatives have the ability to continue to
                        participate in the platform. On the other hand, we limit
                        the participation from those creatives who do not
                        consistently receive high ratings.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle
                        as={Button}
                        variant="light"
                        eventKey="17"
                      >
                        Can I start participating immediately upon signing up?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="17">
                      <Card.Body>
                        When you initially signup, you are assigned few contests
                        to assess your overall quality of submissions. Based
                        upon the quality of your submissions, you will continue
                        to be assigned additional contests. Once you have
                        received enough high ratings on your submissions, your
                        account will be upgraded to "Full Access", so that you
                        can begin participating in all open contests.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle
                        as={Button}
                        variant="light"
                        eventKey="18"
                      >
                        How Do I Get Paid?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="18">
                      <Card.Body>
                        We handle creative payouts via Paypal or Payoneer.
                        Depending upon your country of residence, we may require
                        additional documentation to verify your identity as well
                        as your Tax status.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default Questions;
