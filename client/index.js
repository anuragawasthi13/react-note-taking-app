import React, {Component} from "react";
import {render} from "react-dom";
import { StyleSheet, css} from "aphrodite";

const styles = StyleSheet.create({
	noteHeading: {
		width: "calc(100% - 10px)",
		textAlign: "left",
		padding: "20px 10px",
		marginLeft: "0px",
		backgroundColor: "#fff",
		margin: "5px 0",
		cursor: "pointer",
		wordWrap: "break-word",
		transition: "all 0.3s",
		border: "1px solid #888",
		fontFamily: "'Oxygen', sans-serif",
		color: "#555",
		':hover':{
			backgroundColor: "#eee"
		}
	},

	button:{
		padding: "10px 15px",
		backgroundColor: "#fff",
		border: "1px solid #222",
		color: "#000",
		transition: "all 0.3s",
		cursor: "pointer",
		':hover': {
			backgroundColor: "#eee"
		}
	},

	smallButton:{
		padding: "5px",
		backgroundColor: "#fff",
		border: "1px solid #222",
		color: "#000",
		transition: "all 0.3s",
		cursor: "pointer",
		':hover': {
			backgroundColor: "#eee"
		}
	}
});


class ShowWarning extends Component{
	render(){
		const style1 = {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
			position: "fixed",
			width: "300px",
			height: "300px",
			border: "2px solid #888",
			top: "50%",
			left: "50%",
			transform: this.props.showWarning ? "translate(-50%, -50%)" : "translate(-50%, -250%)",
			opacity: this.props.showWarning ? "1" : "0.4",
			backgroundColor: "#fff",
			zIndex: "5",
			transition: "all 0.5s"
		}

		const style2={
			position: "fixed",
			top: "0",
			left: "0",
			bottom: "0",
			right: "0",
			backgroundColor: "#fff",
			opacity: "0.7",
			transition: "all 0.5s"
		}

		return(
			<div>
				<div style = {style1}>
					<span
						style = {{
							display: "block",
							margin: "5px"
						}}
					>
						Are you sure to delete this note?
					</span>
					<button
						style = {{
							display: "block",
							margin: "5px"
						}}
						className = {css(styles.smallButton)}
						onClick = {this.props.handleDeleteClick}
					>
						Delete
					</button>

					<button
						className = {css(styles.smallButton)}
						style = {{
							display: "block",
							margin: "5px"
						}}
						onClick = {this.props.handleCancelClick}
					>
						Cancel
					</button>
				</div>

				{this.props.showWarning && <div style={style2}></div>}
			</div>
		);
	}
}

class NoteTitle extends Component{
	constructor(props){
		super(props);
		this.state = {
			display: "none",
			showWarning: false
		}
	}

	onmouseenter(){
		this.setState({
			display: "inline"
		});
	}

	onmouseleave(){
		this.setState({
			display: "none"
		});
	}

	handleClick(e){
		console.log(e);
		e.stopPropagation();
		this.setState({
			showWarning: true
		})
	}

	handleDeleteClick(id, p, e){
		console.log(arguments);
		e.stopPropagation();
		this.props.deleteNote(id, e);
		this.setState({
			showWarning: false
		})
	}

	handleCancelClick(e){
		e.stopPropagation();
		this.setState({
			showWarning: false
		})
	}

	render(){
		const {note} = this.props;
		return(
			<div
				className = {css(styles.noteHeading)}
				onClick = {this.props.noteClicked.bind(this, note.id)}
				onMouseEnter = {this.onmouseenter.bind(this)}
				onMouseLeave = {this.onmouseleave.bind(this)}
			>
				<span>
					{note.title}
				</span>

				<button
					className = {css(styles.button), css(styles.smallButton)}
					style = {{
						float: "right",
						display: "" + this.state.display,
						padding: "5px",
						fontSize: "10px"
					}}
					//onClick = {this.props.deleteNote.bind(this, note.id)}
					onClick = {this.handleClick.bind(this)}
				>
					Delete
				</button>

				<ShowWarning showWarning = {this.state.showWarning} handleDeleteClick = {this.handleDeleteClick.bind(this, note.id)} handleCancelClick = {this.handleCancelClick.bind(this)} />

			</div>
		);
	}
}
class Left extends Component{
	constructor(props){
		super(props);
		this.state = {
			display: "none"
		}
	}

	render(){
		return(
			<div style = {{
				position: "relative",
				flex: "1",
				height: "100%",
				minWidth: "300px",
				backgroundColor: "#fff",
				textAlign: "center",
				border: "5px solid #444",
				margin: "5px",
				wordWrap: "break-word"
			}}>
				<div style = {{
					height: "calc(100% - 50px)",
					overflowY: "scroll",
					margin: "5px"
				}}>
				<span style = {{
					display: "block",
					padding : "10px",
					textDecoration: "underline",
					fontFamily: "'Sansita', sans-serif",
					fontSize: "18px"
				}}>
					Your Notes
				</span>

				{this.props.notes.length !== 0 && this.props.notes.map((note, i)=>
					<NoteTitle key = {i} note = {note} noteClicked = {this.props.noteClicked} deleteNote = {this.props.deleteNote} />
				)}
				</div>

				<div style = {{
					position: "absolute",
					bottom: "0",
					width: "100%",
					height: "50px",
					borderTop: "1px solid #444",
					paddingTop: "10px"
					
				}}>
					<button className = {css(styles.button)} style = {{
						margin: "auto"
					}} onClick = {this.props.click}>
						New Note
					</button>
				</div>

			</div>
		);
	}
}

class Right extends Component{
	
	render(){
		return(
			<div style = {{
				flex: "2",
				height: "100%",
				backgroundColor: "#fff",
				border: "5px solid #444",
				margin: "5px"
			}}>

				{this.props.showWelcomeMessage && 
					<div style = {{
						width: "100%",
						height: "100%",
						minWidth: "500px",
						display: "flex",
						backgroundColor: "#fff",
						alignItems: "center",
						justifyContent: "center",
						fontFamily: "'Source Sans Pro', sans-serif"
					}}>
						<div style = {{
							width: "400px",
							height: "300px",
							position: "absolute",
							top: "50%",
							left: "50%",
							traslate: "transition(-50%, -50%)",
							textAlign: "center",
							wordWrap: "break-word",
							fontSize: "13px"
						}}>
							<span>Create a new note or click on a note to read it.</span><br/>
							<span>Notes will be stored in browser localstorage.</span>
						</div>
					</div>
				}
				

				{this.props.note !== null &&
					<div style = {{
						width: "100%",
						height: "100%",
						display: "flex",
						backgroundColor: "#fff",
						flexDirection: "column"
					}}>
						<input
							name = "defaultTitle"
							onChange = {this.props.handleChange.bind(this, this.props.id)}
							value = {this.props.note.title}
							style = {{
								width: "100%",
								height: "60px",
								display: "block",
								padding: "10px",
								fontSize: "24px",
								fontFamily: "'Sansita', sans-serif"
							}}
						/>
						<textarea
							name = "defaultContent"
							value = {this.props.note.content}
							style = {{
								width: "100%",
								minHeight: "calc(100% - 60px)",
								height: "20px",
								display: "block",
								resize: "none",
								placeholder: "Content goes here",
								padding: "10px"
							}}
							onChange = {this.props.handleChange.bind(this, this.props.id)}
							></textarea>
					</div>
				}

				{this.props.showNewNoteDiv &&
					<div style = {{
						width: "100%",
						height: "100%",
						display: "flex",
						backgroundColor: "#fff",
						flexDirection: "column"
					}}>
						<input
							name = "defaultTitle"
							onChange = {this.props.handleChange.bind(this, this.props.id)}
							value = {this.props.default.title}
							style = {{
								width: "100%",
								height: "60px",
								display: "block",
								padding: "10px",
								fontSize: "24px",
								fontFamily: "'Sansita', sans-serif"

							}}
						/>
						<textarea
							name = "defaultContent"
							value = {this.props.default.content}
							style = {{
								width: "100%",
								minHeight: "calc(100% - 60px)",
								height: "20px",
								display: "block",
								resize: "none",
								placeholder: "Content goes here",
								padding: "10px"
							}}
							onChange = {this.props.handleChange.bind(this, this.props.id)}
							></textarea>
					</div>
				}


			</div>
		);
	}
}

class Header extends Component{
	render(){
		return(
			<div style = {{
				backgroundColor: "#fff",
				height: "15%",
				padding: "2% 0",
				textAlign: "center",
				border: "1px solid #999"
			}}>
				<span style = {{
					fontFamily: "cursive",
					color: "#666",
					fontSize: "30px"
				}}>
					React Note Taker Machine
				</span>
			</div>
		);
	}
}

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			notes: [],
			showWelcomeMessage: true,
			showNewNoteDiv: false,
			note: null,
			default: {
				title: "Untitled",
				content: "Content goes here"
			},
			id: null
		}
	}

	click(){
		this.setState({
			default: {
				title: "Untitled",
				content: "Content goes here"
			}
		});
		const newNote = {
			id: this.state.notes.length + 1,
			title: "Untitled",
			content: "Content goes here"
		}

		const notes = [...this.state.notes, newNote];

		this.setState({
			showWelcomeMessage: false,
			showNewNoteDiv: true,
			note: null,
			notes: [...this.state.notes, newNote],
			id: this.state.notes.length + 1
		});

		localStorage.setItem("rntmnotes", JSON.stringify({
			notes: notes
		}))
			
	}

	handleChange(id, e){

		let notes;
		if(e.target.name === "defaultTitle"){

			notes = this.state.notes.map((note)=>{
				if(note.id === id){
					note.title = e.target.value;
				}
				return note;
			})

			this.setState({
				default: {
					...this.state.default,
					title: e.target.value
				},
				notes: notes
			});
		}
		if(e.target.name === "defaultContent"){

			notes = this.state.notes.map((note)=>{
				if(note.id === id){
					note.content = e.target.value;
				}
				return note;
			})

			this.setState({
				default: {
					...this.state.default,
					content: e.target.value
				},
				notes: notes
			});
		}
		
		
		localStorage.setItem("rntmnotes", JSON.stringify({
			notes: notes
		}))
	}

	noteClicked(id, e){
		console.log("note heading clicked", id);
		
		let note;
		
		for(let i = 0; i < this.state.notes.length; i++){
			if(this.state.notes[i].id === id){
				note = this.state.notes[i];
				break;
			}
		}

		this.setState({
			showWelcomeMessage: false,
			showNewNoteDiv: false,
			default: {
				title: "Untitled",
				content: "Content goes here"
			},
			note: note,
			id: id
		})
	}

	deleteNote(id, e){
		e.stopPropagation();

		const notes = this.state.notes.filter((note)=>{
			if(note.id === id){
				return false;
			}
			return true;
		});

		if(this.state.id == id){
			console.log("this should print");
			this.setState({
				id: null,
				note: null,
				showWelcomeMessage: true,
				showNewNoteDiv: null,
				notes: notes
			})
		} else{
			this.setState({
				notes: notes
			})
		}

		localStorage.setItem("rntmnotes", JSON.stringify({
			notes: notes
		}))
		
	}

	componentDidMount(){
		const notes = JSON.parse(localStorage.getItem("rntmnotes"));
		if(notes !== null){
			this.setState({
				notes: notes.notes
			})
		}
	}

	render(){
		console.log(this.state);
		return(
			<div style = {{
				position: "absolute",
				width: "100%",
				height: "100%",
				top:"0",
				left:"0",
				backgroundColor: "#fff"
			}}>
				<Header />
					<div style = {{
						width: "100%",
						height: "83%",
						display: "flex"
					}}>
						<Left
							click = {this.click.bind(this)}
							notes = {this.state.notes}
							noteClicked = {this.noteClicked.bind(this)}
							deleteNote = {this.deleteNote.bind(this)}
						/>
						<Right
							showWelcomeMessage = {this.state.showWelcomeMessage}
							showNewNoteDiv = {this.state.showNewNoteDiv}
							showNotes = {this.state.showNotes}
							handleChange = {this.handleChange.bind(this)}
							default = {this.state.default}
							id = {this.state.id}
							note = {this.state.note}
						/>
					</div>
			</div>
		);
	}
}

render(
	<App />,
	document.getElementById("app")
);