import * as chai from "chai";
import 'mocha';
import * as CT from "#customary-testing";

const suite = {
    title: 'arbo.com.br',
    subject_html: 'index.html'
};

describe(suite.title, async function (){
    this.timeout(4000);
    this.slow(500);

    let window: Window;

    before(() => window = CT.open(suite.subject_html));
    after(() => window.close());

    describe('happy day', async function () {
        let galaxy_el: HTMLElement;
        let logo_el: HTMLElement;
        let logo_circle: HTMLElement;
        function assert_element() {
            galaxy_el = CT.querySelector('galaxy-nexus', window);
            logo_el = CT.querySelector('the-arbo-group-logo', galaxy_el);
        }
        function assert_spinning(spinning: boolean) {
            chai.assert.equal(
                logo_circle.classList.contains('wheel-of-fortune-spinning'),
                spinning
            );
        }
        it('looks good', async function () {
            this.retries(64);
            assert_element();
            logo_circle = CT.querySelector('#logo-circle', logo_el);
            assert_spinning(false);
        });
        it('interact', async function () {
            logo_circle.click();
        });
        it('looks good', async function () {
            this.retries(16);
            assert_spinning(true);
        });
        it('interact', async function () {
            logo_circle.click();
        });
        it('looks good', async function () {
            this.retries(16);
            assert_spinning(false);
        });
    });
});
