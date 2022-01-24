import Enzyme, {mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Review from './review';
import { restaurants } from '../../../fixtures';

Enzyme.configure({adapter: new Adapter()});

const review = restaurants[0].reviews[0];

describe('Review', () => {
  it('should show user', () => {
    const wrapper = mount(<Review review={review} />);
    expect(wrapper.find('[data-id="user"]').length).toBe(1);
  });

  it('should show text', () => {
    const wrapper = mount(<Review review={review} />);
    expect(wrapper.find('[data-id="text"]').length).toBe(1);
  });

  it('should show rating', () => {
    const wrapper = mount(<Review review={review} />);
    expect(wrapper.find('[data-id="rating"]').length).toBe(1);
  });
});