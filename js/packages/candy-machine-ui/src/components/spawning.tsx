const Spawning = () => {

	return <div className="spawning">
		<div className="row items-center">
      <div className="column">
        <img src="/diamond.jpg" alt="Diamond" className="object" />
      </div>
      <div className="intercolumn">
        <div className="plus">
          <svg role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100"><path d="M84.437 39.721H60.273V15.563a1.814 1.814 0 0 0-1.812-1.813H41.536a1.813 1.813 0 0 0-1.812 1.813l-.001 24.16l-24.159-.001c-.961 0-1.812.851-1.813 1.813V58.46a1.81 1.81 0 0 0 1.813 1.812h24.16v24.165a1.814 1.814 0 0 0 1.813 1.813H58.46a1.813 1.813 0 0 0 1.813-1.813V60.273l24.163-.001a1.81 1.81 0 0 0 1.813-1.813l.001-16.925a1.813 1.813 0 0 0-1.813-1.813z" fill="currentColor" /></svg>
        </div>
      </div>
      <div className="column">
        <img src="/platinum.jpg" alt="Platinum" className="object" />
      </div>
      <div className="intercolumn">
        <div className="plus">
          <svg role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100"><path d="M84.437 39.721H60.273V15.563a1.814 1.814 0 0 0-1.812-1.813H41.536a1.813 1.813 0 0 0-1.812 1.813l-.001 24.16l-24.159-.001c-.961 0-1.812.851-1.813 1.813V58.46a1.81 1.81 0 0 0 1.813 1.812h24.16v24.165a1.814 1.814 0 0 0 1.813 1.813H58.46a1.813 1.813 0 0 0 1.813-1.813V60.273l24.163-.001a1.81 1.81 0 0 0 1.813-1.813l.001-16.925a1.813 1.813 0 0 0-1.813-1.813z" fill="currentColor" /></svg>
        </div>
      </div>
      <div className="column">
        <img src="/zombie.jpg" alt="Zombie" className="object" />
      </div>
      <div className="intercolumn">
        <div className="equals">
          <svg role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1025 768"><path d="M960.585 768h-896q-27 0-45.5-19t-18.5-45V576q0-27 18.5-45.5t45.5-18.5h896q27 0 45.5 18.5t18.5 45.5v128q0 27-18.5 45.5t-45.5 18.5zm0-512h-896q-27 0-45.5-19t-18.5-45V64q0-27 18.5-45.5T64.585 0h896q27 0 45.5 18.5t18.5 45.5v128q0 26-18.5 45t-45.5 19z" fill="currentColor" /></svg>
        </div>
      </div>
      <div className="column">
        <img src="/legendary.jpg" alt="Legendary Solpaca" className="object" />
      </div>
	  </div>

	  <div className="row justify-center mt-2">
	    <div className="column"><p className="caption">Diamond</p></div>
	    <div className="intercolumn"><div className="plus"></div></div>
	    <div className="column"><p className="caption">Platinum</p></div>
	    <div className="intercolumn"><div className="plus"></div></div>
	    <div className="column space-y-3"><p className="caption">Zombie</p></div>
	    <div className="intercolumn"><div className="equals"></div></div>
	    <div className="column space-y-3"><p className="caption">Legendary Solpaca</p></div>
		</div>

		<div className="flex md:hidden flex-col items-center justify-start space-y-4">
			<div className="relative flex flex-col items-center justify-center space-y-8">
		    <div className="flex flex-row items-top justify-center space-x-8">
		      <div className="w-32 text-center">
		        <img src="/diamond.jpg" alt="Diamond" className="object" />
		  	    <p className="caption">Diamond</p>
		      </div>
		      <div className="w-32 text-center">
		        <img src="/platinum.jpg" alt="Platinum" className="object" />
		        <p className="caption">Platinum</p>
			    </div>
	      </div>
		   	<div className="flex flex-row items-center justify-center">
		      <div className="w-32 text-center">
		        <img src="/zombie.jpg" alt="Zombie" className="object" />
		       	<p className="caption">Zombie</p>
		     	</div>
		    </div>
				<div className="absolute font-extrabold top-[36%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
				  <div className="plus">
				    <svg role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100"><path d="M84.437 39.721H60.273V15.563a1.814 1.814 0 0 0-1.812-1.813H41.536a1.813 1.813 0 0 0-1.812 1.813l-.001 24.16l-24.159-.001c-.961 0-1.812.851-1.813 1.813V58.46a1.81 1.81 0 0 0 1.813 1.812h24.16v24.165a1.814 1.814 0 0 0 1.813 1.813H58.46a1.813 1.813 0 0 0 1.813-1.813V60.273l24.163-.001a1.81 1.81 0 0 0 1.813-1.813l.001-16.925a1.813 1.813 0 0 0-1.813-1.813z" fill="currentColor" /></svg>
				  </div>
				</div>
	  	</div>
		  <div className="equals">
		    <svg role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1025 768"><path d="M960.585 768h-896q-27 0-45.5-19t-18.5-45V576q0-27 18.5-45.5t45.5-18.5h896q27 0 45.5 18.5t18.5 45.5v128q0 27-18.5 45.5t-45.5 18.5zm0-512h-896q-27 0-45.5-19t-18.5-45V64q0-27 18.5-45.5T64.585 0h896q27 0 45.5 18.5t18.5 45.5v128q0 26-18.5 45t-45.5 19z" fill="currentColor" /></svg>
		  </div>
		  <div className="w-48 text-center">
		    <img src="/legendary.jpg" alt="Legendary" className="object" />
		    <p className="caption">Legendary Solpaca</p>
		  </div>
		</div>
  </div>;

}

export default Spawning;