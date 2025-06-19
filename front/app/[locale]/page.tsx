const Home = async ({ params }: { params: { locale: string } }) => {
  return <div>LANDING PAGE {JSON.stringify(params)}</div>;
};

export default Home;
