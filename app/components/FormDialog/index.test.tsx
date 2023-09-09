import { render, screen, fireEvent } from '@testing-library/react'
import { FormDialog } from './index'

describe('FormDialog', () => {
  const onClose = jest.fn()
  const onConfirm = jest.fn()
  const form = <div>Form content</div>

  beforeEach(() => {
    onClose.mockClear()
    onConfirm.mockClear()
  })

  it('renders the title and form', () => {
    const title = 'Test title'
    render(
      <FormDialog
        open={true}
        onClose={onClose}
        onConfirm={onConfirm}
        title={title}
        form={form}
      />
    )

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText('Form content')).toBeInTheDocument()
  })

  it('renders the description if provided', () => {
    const description = 'Test description'
    render(
      <FormDialog
        open={true}
        onClose={onClose}
        onConfirm={onConfirm}
        title="Test title"
        description={description}
        form={form}
      />
    )

    expect(screen.getByText(description)).toBeInTheDocument()
  })

  it('calls onClose when the cancel button is clicked', () => {
    render(
      <FormDialog
        open={true}
        onClose={onClose}
        onConfirm={onConfirm}
        title="Test title"
        form={form}
      />
    )

    fireEvent.click(screen.getByText('Cancel'))

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onConfirm when the confirm button is clicked', () => {
    render(
      <FormDialog
        open={true}
        onClose={onClose}
        onConfirm={onConfirm}
        title="Test title"
        form={form}
        buttonText='Confirm'
      />
    )

    fireEvent.click(screen.getByText('Confirm'))

    expect(onConfirm).toHaveBeenCalledTimes(1)
  })
})
