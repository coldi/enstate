import { cleanup, fireEvent } from 'react-testing-library';
import renderWithStateProvider from './renderWithStateProvider';

export default function makeCounterTest(initialState, TestComponent) {
    return () => {
        let document;

        beforeEach(() => {
            document = renderWithStateProvider(initialState, TestComponent);
        });

        afterEach(cleanup);

        it('should render with correct initial state', () => {
            expect(document.getByTestId('counter')).toHaveTextContent(0);
        });

        describe('Given the button gets clicked', () => {
            beforeEach(() => {
                fireEvent.click(document.getByTestId('btn'));
            });

            it('should update state', async () => {
                expect(document.getByTestId('counter')).toHaveTextContent(1);
            });
        });

        describe('Given the button gets clicked multiple times', () => {
            beforeEach(() => {
                fireEvent.click(document.getByTestId('btn'));
                fireEvent.click(document.getByTestId('btn'));
                fireEvent.click(document.getByTestId('btn'));
            });

            it('should update state', async () => {
                expect(document.getByTestId('counter')).toHaveTextContent(3);
            });
        });
    };
}
