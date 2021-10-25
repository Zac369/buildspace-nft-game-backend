const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(
      ["Seong Gi-hun", "Cho Sang-woo", "Kang Sae-byeok"],       // Names
      ["https://www.looper.com/img/gallery/the-ending-of-squid-game-season-1-explained/intro-1632168234.webp", // Images
      "https://pyxis.nymag.com/v1/imgs/da8/0d2/ad89af732b7905af04fc5a01bd2492cde7-SquidGame-Unit-108-0133.rsquare.w1200.jpg", 
      "https://pbs.twimg.com/media/E_ijPy1VgAk3OWn.jpg"],
      [300, 100, 200],                    // HP values
      [25, 100, 50],                      // Attack damage values
      "Oh Il-nam", // Boss name
      "https://i1.wp.com/www.bestmoviesonnetflixrightnow.com/wp-content/uploads/2021/09/E_qD3KwUYAIfwt9.jpeg?resize=200%2C224&ssl=1", //Boss image
      10000, // Boss hp
      50 // Boss attack damage
    );
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);

    let txn;
    // We only have three characters.
    // an NFT w/ the character at index 2 of our array.
    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();

    txn = await gameContract.attackBoss();
    await txn.wait();

    txn = await gameContract.attackBoss();
    await txn.wait();

    // Get the value of the NFT's URI.
    let returnedTokenUri = await gameContract.tokenURI(1);
    console.log("Token URI:", returnedTokenUri);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();