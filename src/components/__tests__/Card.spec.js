import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify';
import Card from '@/components/Card'

describe('Card.vue', () => {


    const post = {
        _id: { $oid: 'acbdefghijlmnopqrstuvxz' },
        title: 'Card title',
        content: 'bla bla bla',
        image: 'http://image.com',
        created_at: '2019/09/01',
        author:'jhonatanvinicius'
    }

    const localVue = createLocalVue();
    localVue.use(Vuetify);

    const wrapper = shallowMount(Card, {
        localVue: localVue,
        propsData: { post }
    })

    it('Card shows the title', () => {
        expect(wrapper.text()).toContain(post.title)
    })
    it('Card shows the content', () => {
        expect(wrapper.text()).toContain(post.content)
    })
    it('Card shows the created at', () => {
        expect(wrapper.text()).toContain(post.created_at)
    })
    it('Card shows the author', () => {
        expect(wrapper.text()).toContain(post.author)
    })

    it('Card shows the image', () => {
        const a = wrapper.find('v-img')

        expect(a).toBe(post.image)
        //expect(wrapper.text()).toContain(post.image)
    })


    //expect(wrapper.findAll('.blah').length).toBe(10);






})