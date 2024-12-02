import React from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';

const AboutPage: React.FC = () => {
    return (
        <div className="container">
            <Header />

            <main>
                <section className="blurb">
                    <h1>About Us</h1>
                    <p className="date">Last updated: November 2024</p>
                </section>

                <section>
                    <h2>Our Story</h2>
                    <p>
                        We are just a group of second-year students in university, working on a project for our third semester.
                        Our goal is simple: to create easy-to-use, self-hostable, and open software for voting.
                    </p>
                </section>

                <section>
                    <h2>Lorem ipsum dolor sit amet</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores corporis inventore rem debitis exercitationem. Omnis itaque dolorem veritatis reprehenderit sunt ullam officiis nulla, quod reiciendis, repudiandae odit repellat aspernatur quaerat sed iure vitae! Aut, omnis in. Modi, consequatur harum! Fugiat eius repellendus et dignissimos, laudantium voluptates autem? Amet pariatur ratione eveniet doloribus mollitia et praesentium sunt quaerat! Ullam vitae, explicabo blanditiis culpa, omnis, libero assumenda nulla dolorum facere itaque sed minima aliquam aut minus adipisci! Obcaecati quibusdam cupiditate itaque natus officiis aliquid labore earum ducimus cumque ea nesciunt, et repellat suscipit nemo dolorem unde amet eos inventore hic incidunt. Aperiam, aspernatur commodi! Voluptatum nobis hic consequuntur quas tempore laudantium sit nostrum saepe ea perspiciatis ipsa, quaerat praesentium asperiores, omnis placeat provident, officiis dolorum! Placeat, necessitatibus odio. Enim laboriosam laudantium nulla amet. Eveniet saepe numquam, nemo, amet quos explicabo cumque aliquam accusamus esse aliquid consequatur, perspiciatis ab tenetur molestias dolore tempore quia sint sequi asperiores culpa sapiente officia dicta possimus ad. Quaerat ipsum enim itaque adipisci ducimus at totam tenetur praesentium illo soluta earum deleniti vitae perspiciatis qui, sint libero esse. Quisquam tempora qui voluptate eveniet eligendi, molestias aperiam corporis laboriosam debitis minus veniam exercitationem soluta ducimus, quidem maxime dolores suscipit!
                    </p>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;
