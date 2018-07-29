import { shallowMount } from '@vue/test-utils'
import ThePostComments from '@/components/ThePostComments.vue'
import PostComment from '@/components/PostComment.vue'
import comments from '../dummy/comments.js'

describe('ThePostComments.vue', () => {
  it('PostComment가 emit한 new-recomment-uploaded 이벤트를 부모로 전파함', () => {
    const wrapper = shallowMount(ThePostComments, {
      propsData: { comments, postId: 1 }
    })
    wrapper.find(PostComment).vm.$emit('new-recomment-uploaded')
    expect(wrapper.emitted('new-recomment-uploaded')).toBeTruthy()
  })
  // it('댓글 저장 버튼 클릭 시 new-comment-uploaded 이벤트가 전파됨')
  // @TODO: 버튼 클릭 시 new-comment-uploaded 이벤트가 발생함 (인터페이스 정의)
  // @TODO: 빈 댓글 방지 (?)
})
