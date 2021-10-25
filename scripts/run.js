const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(
      ["Seong Gi-hun", "Cho Sang-woo", "Kang Sae-byeok"],       // Names
      ["QmdwzYVeieJzMsqdZedjnmQGJXyZgrLiN68bwUa1Q8U3Xo", // Images
      "Qmeh7dztSx31hd8twwGbdG3QfKbVszMQ2z5kmD9QtLx7TT", 
      "QmaLhHYiBv6DVLhaVRCksskt7LHREeNUTNdHSbPwFH74BQ"],
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