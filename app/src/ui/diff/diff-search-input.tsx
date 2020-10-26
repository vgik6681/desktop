import * as React from 'react'
import { TextBox } from '../lib/text-box'

interface IDiffSearchInputProps {
  /**
   * Called when the user indicated that they either
   * want to initiate a search or want to advance to
   * the next hit (typically done by hitting `Enter`).
   */
  readonly onSearch: (queryString: string) => void

  /**
   * Called when the user indicates that they want
   * to abort the search, typically done by clicking
   * outside of the diff search input component or
   * by hitting `Escape`.
   */
  readonly onClose: () => void
}

interface IDiffSearchInputState {
  readonly value: string
}

/**
 * A component which attempts to minimize the need for unmounting
 * and remounting text diff components with the ultimate goal of
 * avoiding flickering when rapidly switching between files.
 */
export class DiffSearchInput extends React.Component<
  IDiffSearchInputProps,
  IDiffSearchInputState
> {
  public constructor(props: IDiffSearchInputProps) {
    super(props)

    this.state = { value: '' }
  }

  public render() {
    return (
      <form onSubmit={this.onSearch} className="diff-search">
        <TextBox
          placeholder="Search..."
          type="search"
          autoFocus={true}
          onValueChanged={this.onChange}
          onKeyDown={this.onKeyDown}
          onBlur={this.onBlur}
        />
      </form>
    )
  }

  private onChange = (value: string) => {
    this.setState({ value })
  }

  private onSearch = (event: React.FormEvent) => {
    event.preventDefault()
    this.props.onSearch(this.state.value)
  }

  private onBlur = () => {
    this.props.onClose()
  }

  private onKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Escape') {
      this.props.onClose()
    }
  }
}
